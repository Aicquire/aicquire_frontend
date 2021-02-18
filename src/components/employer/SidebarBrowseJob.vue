<template>
  <v-treeview
    class="tree"
    open-on-click
    dense
    hoverable
    activatable
    :items="items"
    expand-icon=""
  >
    <template slot="label" slot-scope="props">
      <router-link v-if="props.item.to" tag="div" :to="props.item.to">{{
        props.item.name
      }}</router-link>
      <span v-else>{{ props.item.name }}</span>
    </template>

    <template v-slot:prepend="{ item }">
      <v-icon v-if="item.children" x-small>mdi-format-list-bulleted</v-icon>
      <v-icon v-else x-small>{{ icon[item.icon] }}</v-icon>
    </template>

    <template v-slot:append="{ item }">
      <v-icon v-if="item.children" small class="arrow-down"
        >mdi-menu-down</v-icon
      >
    </template>
  </v-treeview>
</template>

<script>
export default {
  name: 'JobsTree',
  data() {
    return {
      items: [
        {
          id: 1,
          name: 'Jobs',
          children: [
            { id: 2, name: 'Create Job', icon: 'job', to: '/employerpostjobad' },
            { id: 3, name: 'Active Jobs', icon: 'activejob',  to: '/employerviewactivejobads' },
            { id: 4, name: 'Saved Drafts', icon: 'saveddrafts', to: '' },
            { id: 5, name: 'Archive', icon: 'archive', to: '' },
            { id: 6, name: 'Applications', icon: 'applications', to: '/employerjobpositions' }
          ]
        }
      ],
      icon: {
        job: 'mdi-playlist-edit',
        activejob: 'mdi-clipboard-text-outline',
        saveddrafts: 'mdi-paperclip',
        archive: 'mdi-folder-open',
        postjob: 'mdi-application-export',
        applications: 'mdi-account-search'
      }
    };
  }
};
</script>

<style scoped></style>
