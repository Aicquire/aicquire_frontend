<template>
  <v-col>
    <v-col>
      <v-row>
        <br />
        <v-btn
          icon
          big
          style="color:rgba(255,0,0,0.75);"
          @click.prevent="startRecording()"
          v-bind:disabled="isStartRecording"
          id="btnStart"
          ><v-icon>mdi-record</v-icon></v-btn
        >
        <v-btn
          icon
          big
          style="color:rgba(255,0,0,0.75);"
          @click.prevent="stopRecording()"
          v-bind:disabled="isStopDisabled"
          id="btnRetake"
          ><v-icon>mdi-stop</v-icon></v-btn
        >
        <v-btn
          icon
          big
          style="color:rgb(0,160,0);"
          @click.prevent="submitVideo()"
          v-bind:disabled="isSaveDisabled"
          id="btnSave"
          ><v-icon>mdi-check-bold</v-icon></v-btn
        >
        <v-btn
          icon
          big
          style="color:rgba(255,0,0,0.75);"
          @click.prevent="retakeVideo()"
          v-bind:disabled="isRetakeDisabled"
          id="btnRetake"
          ><v-icon>mdi-repeat</v-icon></v-btn
        >
        <v-spacer></v-spacer>
        <v-btn class="uploadStatus" text big style="color:rgb(0,160,0);">{{ submitText }}</v-btn>
      </v-row>
    </v-col>

    <div class="videoBox">
      <video id="myVideo" playsinline class="video-js vjs-default-skin">
        <p class="vjs-no-js">
          <a href="https://videojs.com/html5-video-support/" target="_blank"> </a>
        </p>
      </video>
    </div>
  </v-col>
</template>
<script>
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-undef
import "video.js/dist/video-js.css";
import "videojs-record/dist/css/videojs.record.css";
import videojs from "video.js";
import "webrtc-adapter";
import RecordRTC from "recordrtc";
import Record from "videojs-record/dist/videojs.record.js";
import { apiURL } from "@/store/index.js";
import fs from "fs";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
export default {
  props: ["minutes", "currentMessage"],
  data() {
    return {
      selectedMinutes: 0,
      player: "",
      retake: 0,
      isSaveDisabled: true,
      isStartRecording: false,
      isRetakeDisabled: true,
      isStopDisabled: true,
      submitText: "",
      options: {
        controls: true,
        width: 680,
        height: 315,
        fluid: false,
        bigPlayButton: false,
        controlBar: {
          playToggle: true,
          recordToggle: false,
          remainingTimeDisplay: true,
          volumePanel: false,
          fullscreenToggle: false,
          CurrentTimeDisplay: true,
          TimeDivider: true,
          DurationDisplay: true,
          deviceButton: false,
        },
        plugins: {
          record: {
            video: {
              minWidth: 640,
              minHeight: 480,
            },
            frameWidth: 640,
            frameHeight: 480,
            audio: true,
            pip: false,
            maxLength: this.minutes * 60,
            debug: true,
            recordIndicator: true,
          },
        },
      },
    };
  },
  mounted() {
    this.submitText = this.currentMessage;
    this.selectedMinutes = this.minutes;
    this.player = videojs("myVideo", this.options, () => {});
    this.player.on("deviceReady", () => {
      this.player.record().start();
    });
    this.player.on("deviceError", () => {
      console.log("device error:", this.player.deviceErrorCode);
    });
    this.player.on("error", (element, error) => {
      console.error(error);
    });
    this.player.on("startRecord", () => {});
    this.player.on("finishRecord", () => {
      this.isSaveDisabled = false;
      if (this.retake == 0) {
        this.isRetakeDisabled = false;
      }
    });
  },
  methods: {
    startRecording() {
      this.isStartRecording = true;
      this.isStopDisabled = false;
      this.submitText = "Recording Started";
      this.player.record().getDevice();
    },
    stopRecording() {
      this.isStopDisabled = true;
      this.isRetakeDisabled = false;
      this.submitText = "Recording Stopped";
      this.player.record().stopDevice();
      this.player.record().startVideoPreview();
    },
    submitVideo: async function() {
      const ffmpeg = createFFmpeg({ log: false });
      this.isSaveDisabled = true;
      this.isRetakeDisabled = true;
      this.isStopDisabled = true;
      this.submitText = "Preparing to Upload";
      var data = this.player.recordedData;
      await ffmpeg.load();
      ffmpeg.FS("writeFile", "test.avi", await fetchFile(data));
      await ffmpeg.run("-i", "test.avi", "test.mp4");
      const value = ffmpeg.FS("readFile", "test.mp4");
      await ffmpeg.FS("unlink", "test.mp4");
      value.data = URL.createObjectURL(new Blob([value.buffer], { type: "video/mp4" }));
      value.blob = new Blob([value.buffer], { type: "video/mp4" });

      var formData = new FormData();
      formData.append("file", value.blob, data.lastModified);
      this.submitText = "Uploading Video";
      console.log("uploading recording:", data.lastModified);
      this.player.record().stopDevice();
      fetch(apiURL + "/azure/upload/video", {
        method: "POST",
        body: formData,
      })
        .then((success) => {
          console.log("recording upload complete.");
          this.submitText = "Video Response Saved";
          return success.text();
        })
        .then((data) => {
          this.$emit("clicked", data);
        })
        .catch((error) => {
          console.error("an upload error occurred!");
          this.submitText = "Upload Failed";
        });
    },
    retakeVideo() {
      this.isSaveDisabled = true;
      this.isStopDisabled = false;
      this.isRetakeDisabled = true;
      this.submitText = "Retaking video";
      this.retake += 1;
      this.player.record().start();
    },
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<style scope>
.uploadStatus {
  padding: 0 16px;
}
.videoBox {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-top: 16px;
  background: #fff;
}
#myVideo {
  min-width: auto !important;
  max-height: 100% !important;
}
</style>
