<template>
  <v-simple-table height="300px" outlined>
    <template>
      <tbody>
        <tr
          v-for="(item) in fileList"
          :key="item.fileId"
        >
          <td>{{ item.originName }}</td>
          <td class="btn" md="1" v-if="!fileStatus" @click="downloadFile(item)"><v-icon>mdi-download-box-outline</v-icon></td>
          <td class="btn" md="1" v-if="fileStatus" @click="deleteFile(item.fileId, item.postsId)"><v-icon>mdi-delete</v-icon></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import axios from 'axios'

const DEV_URL = 'http://localhost:9090/rest/api/v1'

export default {
  props: ['fileStatus', 'fileList'],
  data () {
    return {

    }
  },
  methods: {
    /* 파일 다운로드 메소드 */
    downloadFile (item) {
      /** 익스플로러 브라우저 체킹 */
      // let agent = navigator.userAgent.toLowerCase()
      // if ((navigator.appName === 'Netscape' && navigator.userAgent.search('Trident') !== -1)) {
      //   alert('다른 브라우저를 사용해 주세요 ex) [chrome, firefox, safari etc.. ]')
      //   return false
      // } else if (agent.indexOf('msie') !== 1) {
      //   alert('다른 브라우저를 사용해 주세요 ex) [chrome, firefox, safari etc.. ]')
      //   return false
      // }

      /* 다운로드 요청 */
      axios.get(DEV_URL + '/files/' + item.fileId, {
        responseType: 'blob'
      }).then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data], {type: item.contentType}))
        const link = document.createElement('a')

        link.href = url
        if (item.contentType.includes('octet')) {
          link.setAttribute('download', item.originName + item.filePath)
        } else {
          link.setAttribute('download', item.originName)
        }
        document.body.appendChild(link)
        link.click()
      }).catch((err) => { console.log(err) })
    },
    /* 파일 삭제 메소드 */
    deleteFile (fileId, postId) {
      alert('deleteFile')
      axios.delete(DEV_URL + '/posts/' + postId + '/files/' + fileId).then(
        (res) => {
          for (const index in this.fileList) {
            if (this.fileList[index].fileId === fileId) { delete this.fileList[index] }
          }
        })
      this.$emit('testt', this.fileList)
    }
  }
}
</script>

<style lang="sss" scoped>
  .btn {
    cursor:pointer;
  }
</style>
