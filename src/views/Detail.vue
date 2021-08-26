<template>
  <v-app>
    <h1 class="text-4">상세 페이지</h1>
    <v-container>
      <v-row>
        <v-col md="2">
          작성일:
        </v-col>
          <v-col md="2">
            {{ post.modifyDate }}
          </v-col>
      </v-row>
      <v-row>
        <v-col md="2">
          작성자:
        </v-col>
        <v-col md="2">
          {{  post.modifyName }}
        </v-col>
      </v-row>
      <!-- 제목 -->
      <v-row class="justify-center">
        <v-col md="10">
          <v-text-field
            :readonly="titleStatus"
            hide-details="auto"
            outlined
            label="제목"
            :value="titleText"
            @input="updateTitle"
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
            :value="contentText"
            @input="updateContent"
          ></v-textarea>
          </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-card style="width: 82%">
          <v-col>
            <FileListComponent
            :fileStatus="fileStatus"
            :fileList="fileList"
            @search-file="searchFile"
            />
          </v-col>
        </v-card>
      </v-row>
      <!-- fileupload frame -->
      <v-row class="justify-center" v-if="fileStatus">
        <v-col md="8">
            <v-file-input
          outlined
          show-size
          label="파일 업로드"
          counter
          chips
          multiple
          truncate-length="24"
          v-model="addFileList"
        ></v-file-input>
        </v-col>
        <!-- 파일 추가-->
        <v-col md="2">
            <v-btn @click="addFiles">파일 등록</v-btn>
        </v-col>
        <!-- / 파일 추가-->
      </v-row>
      <!-- /fileuplaod frame -->
      <v-row>
        <v-col md="3">
          <v-btn @click="goList()">목록</v-btn>
        </v-col>
        <!-- 상세 페이지-->
        <v-col md="8" class="text-right pr-3" v-show="!readStatus">
          <v-btn @click="editPost()">수정</v-btn>
          <v-btn @click="deletePost()">삭제</v-btn>
        </v-col>
        <!-- 수정 페이지 -->
        <v-col md="8" class="text-right pr-3" v-show="readStatus">
          <v-btn @click="updatePost()">등록</v-btn>
          <v-btn @click="cancelPost()">취소</v-btn>
        </v-col>
      </v-row>
      <!-- 댓글 작성란 -->
      <v-row class="justify-center">
        <v-col md="9" class="pl-10">
          <v-container fluid>
            <v-textarea
              name="input-7-1"
              label="댓글 작성 란"
              outlined
              auto-grow
              v-bind:value="comment"
              v-on:input="inputComment"
            ></v-textarea>
          </v-container>
        </v-col>
        <v-col md="2" class="pr-5">
          <v-btn
          style="height:100px; width:110px"
          class="mr-5 mt-5"
          @click="editComment()"
          >
            댓글 등록
          </v-btn>
        </v-col>
      </v-row>
      <!-- /댓글 작성란 -->
      <!-- 댓글 반복 -->
      <v-row v-for="(item, index) in post.comments"
        :key="index"
        class="comment-area"
        >
        <v-col>
          <span>
            작성자 : {{ item.modifyName }}
          </span>
          <br />
          <span>
            작성일 : {{ item.modifyDate }}
          </span>
        </v-col>
        <v-col md="8">
          {{ item.content }}
        <v-textarea>
        </v-textarea>
        </v-col>
      </v-row>
      <!-- /댓글 반복-->
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
      addFileList: null,
      rules: [
        (value) => !!value || '제목을 입력해 주세요',
        (value) => (value && value.length >= 1) || '제목을 입력해 주세요'
      ],
      titleStatus: true,
      contentStatus: true,
      readStatus: false,
      titleText: '',
      contentText: '',
      fileStatus: false,
      temp: {
        title: null,
        content: null
      },
      comment: null
    }
  },
  created () {
    // this.getDatas()
    /* 처음 페이지 들어왔을 때 axios를 통해 데이터 가져오기 */
    axios.get(DEV_URL + '/' + this.$route.params.postsId).then((res) => {
      if (res.data != null && res.data !== '' && res.headers['content-length'] !== 0) {
        this.post = res.data
        this.titleText = this.post.title
        this.contentText = this.post.content
        this.fileList = this.post.files
        console.log(res.data)
      } else if (res.data == null || res.data === '' || res.headers['content-length'] === 0) {
        /* 해당 게시물이 없을 경우 삭제 처리 */
        alert('해당 게시물은 삭제 되었습니다.')
        router.replace({name: 'posts'})
      }
    }).catch((err) => { console.log(err) })
  },
  methods: {
    /* 전체 리스트로 돌아가는 메소드 */
    goList () {
      if (this.readStatus) {
        if (window.confirm('수정중인 데이터가 날아갑니다. 떠나시겠습니까?')) {
          this.$router.replace({name: 'posts'})
        }
      } else {
        this.$router.push({name: 'posts'})
      }
    },
    /** 수정 메소드 */
    editPost () {
      this.changeStatus()
      /* 임시객체에 저장 */
      this.temp.title = this.titleText
      this.temp.content = this.contentText
    },
    /* 수정 클릭 시 readonly 수정 */
    changeStatus () {
      this.titleStatus === true ? this.titleStatus = false : this.titleStatus = true // title readonly
      this.contentStatus === true ? this.contentStatus = false : this.contentStatus = true // content readonly
      this.readStatus === false ? this.readStatus = true : this.readStatus = false // readonly flag
      this.fileStatus === false ? this.fileStatus = true : this.fileStatus = false
    },
    /* 등록 메소드 */
    async updatePost () {
      // update logic
      await axios.put(`${DEV_URL}/${this.$route.params.postsId}`, {title: this.titleText, content: this.contentText})
      this.addFiles()
      // axios
      this.changeStatus()
    },
    /* 삭제 메소드 */
    deletePost () {
      /* 삭제 axios */
      if (window.confirm('삭제 하시겠습니까?')) {
        axios.delete(DEV_URL + '/' + this.$route.params.postsId).then((res) => {
          if (res.status === 200) {
            alert('삭제되었습니다.')
            router.replace({name: 'posts'})
          }
        })
      }
    },
    /* 수정 취소 메소드 */
    cancelPost () {
      /* 임시에 저장된 값 다시 세팅 */
      this.titleText = this.temp.title
      this.contentText = this.temp.content
      this.changeStatus()
      this.addFileList = null
    },
    /* 삭제 후 파일 리스트 조회 */
    searchFile () {
      axios.get(`${DEV_URL}/${this.$route.params.postsId}/files`).then((res) => {
        this.fileList = res.data
      })
    },
    /* 파일 추가 */
    async addFiles () {
      if (this.addFileList && this.addFileList && this.addFileList[0]) {
        const formData = new FormData()
        for (let i = 0; i < this.addFileList.length; i++) {
          formData.append('files', this.addFileList[i])
        }
        await axios.post(DEV_URL + '/' + this.$route.params.postsId + '/files', formData, {
          headers: {'Content-Type': 'multipart/form-data'}
        }).then((res) => {
          this.fileList = res.data
          this.addFileList = null
        }).catch((err) => {
          console.log(err)
        }).then(() => {
          this.addFileList = null
        })
      }
      this.addFileList = null
    },
    /** v-on method */
    updateTitle (value) {
      let updateText = value
      this.titleText = updateText
    },
    /** v-on method */
    updateContent (value) {
      let updateText = value
      this.contentText = updateText
    },
    inputComment (value) {
      let inputText = value
      this.comment = inputText
    },
    /* 댓글 추가 */
    editComment () {
      axios.post(`${DEV_URL}/${this.$route.params.postsId}/comm`, {content: this.comment}).then((res) => {
        console.log(res)
      })
    }
    // getDatas () {
    //   axios.get(DEV_URL + '/' + this.$route.params.postsId).then((res) => {
    //     if (res.data != null && res.data !== '' && res.headers['content-length'] !== 0) {
    //       this.post = res.data
    //       this.titleText = this.post.title
    //       this.contentText = this.post.content
    //       this.fileList = this.post.files
    //     } else if (res.data == null || res.data === '' || res.headers['content-length'] === 0) {
    //     /* 해당 게시물이 없을 경우 삭제 처리 */
    //       alert('해당 게시물은 삭제 되었습니다.')
    //       router.replace({name: 'posts'})
    //     }
    //   }).catch((err) => { console.log(err) })
    // }

  }
}
</script>

<style scoped>
  .comment-area{
    border:1px solid black;
    width:980px;
    margin-left:90px;
    margin-bottom:20px;
    margin-top:20px;
  }
</style>
