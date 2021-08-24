<template>
  <v-app>
    <h1 class="text-4">상세 페이지</h1>
    <v-container>
      <!-- 제목 -->
      <v-row class="justify-center">
        <v-col md="10">
          <v-text-field
            :readonly="titleStatus"
            hide-details="auto"
            outlined
            label="제목"
            v-bind:value="titleText"
          ></v-text-field>
        </v-col>
      </v-row>
      <!-- /제목 -->
      <!-- 내용 -->
      <v-row class="justify-center">
          <v-col md="10">
          <v-textarea
            outlined
            :readonly="contentStatus"
            name="input-7-1"
            auto-grow
            label="내용"
            v-bind:value="contentText"
          ></v-textarea>
          </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-card style="width: 82%">
          <v-col>
            <FileListComponent :fileStatus="fileStatus" :fileList="fileList"/>
          </v-col>
        </v-card>
      </v-row>
      <!-- file upload frame -->
      <v-row class="justify-center">
        <v-col md="10">
            <v-file-input
          v-if="fileStatus"
          outlined
          show-size
          label="파일 업로드"
          counter
          chips
          multiple
          truncate-length="24"
          v-on:change="uploadFiles"
          v-model="test"
        ></v-file-input>
        </v-col>
      </v-row>
      <!-- /fileuplaod frame -->
      <v-row>
        <v-col md="3">
          <v-btn @click="goList()">목록</v-btn>
        </v-col>
        <!-- 상세 페이지-->
        <v-col md="8" class="text-right pr-3" v-show="!readStatus">
          <v-btn @click="changeStatus()">수정</v-btn>
          <v-btn @click="deletePost()">삭제</v-btn>
        </v-col>
        <!-- 수정 페이지 -->
        <v-col md="8" class="text-right pr-3" v-show="readStatus">
          <v-btn @click="updatePost()">등록</v-btn>
          <v-btn @click="cancelPost()">취소</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import router from '@/router/index.js'
import FileListComponent from '@/components/FileList.vue'
import axios from 'axios'

const DEV_URL = 'http://localhost:9090/rest/api/v1/posts'

export default {
  components: {FileListComponent: FileListComponent},
  data () {
    return {
      post: null,
      fileList: null,
      files: [],
      test: null,
      rules: [
        (value) => !!value || '제목을 입력해 주세요',
        (value) => (value && value.length >= 1) || '제목을 입력해 주세요'
      ],
      titleStatus: true,
      contentStatus: true,
      readStatus: false,
      titleText: 'titleText',
      contentText: 'contentText',
      fileStatus: false
    }
  },
  created () {
    /* 처음 페이지 들어왔을 때 axios를 통해 데이터 가져오기 */
    axios.get(DEV_URL + '/' + this.$route.params.postsId).then((res) => {
      this.post = res.data
      this.titleText = this.post.title
      this.contentText = this.post.content
      this.fileList = this.post.files
    })
    /**/
    /* 해당 게시물이 없을 경우 삭제 처리 */
    // alert('해당 게시물은 삭제 되었습니다.')
    // router.push({name: 'board'})
  },
  methods: {
    /* 전체 리스트로 돌아가는 메소드 */
    goList () {
      if (this.readStatus) {
        let check = window.confirm('작성한 내용이 사라집니다 목록으로 가시겠습니까?')
        if (check) {
          this.$router.replace({name: 'posts'})
        }
      } else {
        this.$router.push({name: 'posts'})
      }
    },
    /* 수정 클릭 시 readonly 수정 */
    changeStatus () {
      this.titleStatus === true ? this.titleStatus = false : this.titleStatus = true // title readonly
      this.contentStatus === true ? this.contentStatus = false : this.contentStatus = true // content readonly
      this.readStatus === false ? this.readStatus = true : this.readStatus = false // readonly flag
      this.fileStatus === false ? this.fileStatus = true : this.fileStatus = false
    },
    /* 수정 메소드 */
    updatePost () {
      // update logic
      // axios
      window.alert('등록 메소드')
      this.changeStatus()
    },
    /* 삭제 메소드 */
    deletePost () {
      // delete
      let check = window.confirm('삭제 하시겠습니까?')
      /* 삭제 axios */
      if (check) {
        axios.delete('DEV_URL' + '/' + this.$route.params.postsId).then((res) => {
          if (res.status === 200) {
            alert('삭제되었습니다.')
            router.replace({name: 'posts'})
          }
        })
      }
    },
    /* 수정 취소 메소드 */
    cancelPost () {
      // cancel
      window.alert('취소 메소드')
      router.go(router.currentRoute) // reload
    },
    uploadFiles () {

    }
  }
}
</script>
