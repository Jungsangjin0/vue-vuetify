<template>
  <v-simple-table height="300px" outlined>
    <template>
      <tbody>
        <tr
          v-for="(item, idex) in fileList"
          :key="idex"
        >
          <td>{{ item.originName }}</td>
          <td class="btn" md="1" v-if="!fileStatus" @click="downloadFile()"><v-icon>mdi-download-box-outline</v-icon></td>
          <td class="btn" md="1" v-if="fileStatus" @click="deleteFile()"><v-icon>mdi-delete</v-icon></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  props: ['fileStatus', 'fileList'],
  data () {
    return {
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159
        },
        {
          name: 'Ice cream sandwich',
          calories: 237
        },
        {
          name: 'Eclair',
          calories: 262
        },
        {
          name: 'Cupcake',
          calories: 305
        },
        {
          name: 'Gingerbread',
          calories: 356
        },
        {
          name: 'Jelly bean',
          calories: 375
        },
        {
          name: 'Lollipop',
          calories: 392
        },
        {
          name: 'Honeycomb',
          calories: 408
        },
        {
          name: 'Donut',
          calories: 452
        },
        {
          name: 'KitKat',
          calories: 518
        }
      ]
    }
  },
  methods: {
    downloadFile () {
      alert('downloadFile')
    },
    deleteFile () {
      alert('deleteFile')
    }
  }
}
</script>

<style lang="sss" scoped>
  .btn {
    cursor:pointer;
  }
</style>
