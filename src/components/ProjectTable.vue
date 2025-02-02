<template>
  <ContextMenu
    v-if="isContextMenuDisplayed"
    :positionX="x"
    :positionY="y"
    @context-out="handleContextOut"
    :releaseId="chosenReleaseId"
  />
  <table>
    <thead>
      <tr>
        <th>nr release</th>
        <th>Repozytorium</th>
        <th>Obiekt projektowy</th>
        <th>Data utworzenia</th>
        <th>Data modyfikacji</th>
        <th>Zmiany</th>
        <th>Opis</th>
        <th>Nr commit gitlab</th>
        <th>Ostatni wdrożony</th>
        <th>JIRA status</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="release in releases"
        :key="release.releaseId"
        @contextmenu.prevent="event => handleContextMenu(event, release)"
        @click="handleRowClick(release.releaseId)"
      >
        <td>{{ release.releaseNumber }}</td>
        <td>
          <ListableLinkCell
            v-if="release.repos.length > 1"
            :sourceList="release.repos"
            keyName="repoId"
            valueName="repoName"
          />
        </td>
        <td>
          <ListableLinkCell
            v-if="release.mgmts.length > 1"
            :sourceList="release.mgmts"
            keyName="id"
            valueName="mgmtName"
          />
        </td>
        <td>{{ release.creationDate }}</td>
        <td>{{ release.modificationDate }}</td>
        <td>Ikony ze zmianami</td>
        <td>{{ release.descrption }}</td>
        <td>{{ release.gitlabCommit }}</td>
        <td>{{ release.lastDeployed }}</td>
        <td>obrazek status</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th>Liczba releasów</th>
        <td>{{ releases.length }}</td>
        <td colspan="10"></td>
      </tr>
    </tfoot>
  </table>
</template>
<script>
import ListableLinkCell from '@/components/ListableLinkCell.vue';
import ContextMenu from './ContextMenu.vue';

export default {
  name: 'ProjectTable',
  components: {
    ListableLinkCell,
    ContextMenu,
  },
  props: {
    releases: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isContextMenuDisplayed: false,
      chosenReleaseId: null,
      x: 0,
      y: 0,
    };
  },
  methods: {
    handleRowClick(releaseId) {
      this.$router.push(`/release-details/${releaseId}`);
    },
    handleContextMenu(event, release) {
      this.x = event.clientX;
      this.y = event.clientY;
      this.isContextMenuDisplayed = true;
      //remove from array
      // const jj = this.projects.find(i => i.releaseId === release.releaseId)
      // const index = this.projects.indexOf(jj)
      // this.projects.splice(index, 1)
      this.chosenReleaseId = release.releaseId;
    },
    handleContextOut() {
      this.isContextMenuDisplayed = false;
    },
  },
};
</script>
<style scoped>
table {
  border-collapse: collapse;
  margin: 0 auto;
  box-shadow:
    2px 2px 12px rgba(0, 0, 0, 0.2),
    -1px -1px 8px rgba(0, 0, 0, 0.2);
}

thead,
tfoot {
  background-color: #0e2f3b;
  color: white;
}

th {
  text-align: center;
  padding: 8px;
  transition: 0.3s;
}

tr {
  cursor: pointer;
  transition: 0.3s;
}

td {
  text-align: center;
  padding: 12px;
  border: none;
}

tr:nth-child(even) {
  background-color: rgba(0, 0, 0, 0.4);
}

thead th:hover {
  transform: scale(1.2);
  box-shadow:
    2px 2px 12px rgba(0, 0, 0, 0.2),
    -1px -1px 8px rgba(0, 0, 0, 0.2);
  background-color: #cf345d;
  font-weight: bold;
}

tbody tr:hover {
  background-color: #cf345d;
  transform: scale(1.03);
  box-shadow:
    2px 2px 12px rgba(0, 0, 0, 0.2),
    -1px -1px 8px rgba(0, 0, 0, 0.2);
  color: white;
  font-weight: bold;
}
</style>
