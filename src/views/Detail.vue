<template>
  <v-app>
    <h1 class="text-4">상세 페이지</h1>
    <v-container>
      <v-row>
        <v-col md="2"> 작성일: </v-col>
        <v-col md="2">
          {{ this.post.modifyDate }}
        </v-col>
      </v-row>
      <v-row>
        <v-col md="2"> 작성자: </v-col>
        <v-col md="2">
          {{ this.post.modifyName }}
        </v-col>
      </v-row>
      <!-- 제목 -->
      <v-row class="justify-center">
        <v-col md="10">
          <v-text-field
            :readonly="status.titleStatus"
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
            :readonly="status.contentStatus"
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
              :fileStatus="status.fileStatus"
              :fileList="fileList"
              @search-file="searchFile"
            />
          </v-col>
        </v-card>
      </v-row>
      <!-- fileupload frame -->
      <v-row class="justify-center" v-if="status.fileStatus">
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
        <v-col md="8" class="text-right pr-3" v-show="!status.readStatus">
          <v-btn @click="editPost()">수정</v-btn>
          <v-btn @click="deletePost()">삭제</v-btn>
        </v-col>
        <!-- 수정 페이지 -->
        <v-col md="8" class="text-right pr-3" v-show="status.readStatus">
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
            style="height: 100px; width: 110px"
            class="mr-5 mt-5"
            @click="editComment()"
          >
            댓글 등록
          </v-btn>
        </v-col>
      </v-row>
      <!-- /댓글 작성란 -->
      <!-- 댓글 반복 -->
      <v-row
        v-for="(item) in post.comments"
        :key="item.commId"
        class="comment-area"
      >
        <v-col md="2">
          <span> 작성자 : {{ item.modifyName }} </span>
          <br />
          <span> 작성일 : {{ item.modifyDate }} </span>
        </v-col>
        <v-col md="7">
          <v-textarea
            class="mt-10"
            v-if="item.commId == currentId"
            v-bind:value="item.content"
            v-on:input="setComment"
            height="80"
            no-resize
          >
          </v-textarea>
          <span v-else> {{ item.content }}</span>
        </v-col>
        <v-spacer />
        <!-- 로그인 시 해당 유저id와 작성자의 id비교 하여 수정 버튼 보여주기-->
        <v-col md="2">
          <v-menu transition="scroll-y-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="ma-2" v-bind="attrs" v-on="on" icon>
               <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(text, index) in commentItems" :key="index" @click="chooseCommentStatus">
                <v-list-item-title v-text="text" :id="item.commId"/>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-col v-if="status.commentStatus && item.commId == currentId">
           <v-btn @click="updateComment(item.commId)">
            수정
          </v-btn>
          <v-btn @click="cancelEdittingComment()">
            취소
          </v-btn>
          <v-btn @click="deleteComment(item.commId)">
            삭제
          </v-btn>
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
  components: { FileListComponent: FileListComponent },
  data () {
    return {
      currentId: 0,
      active: false,

      post: null,
      fileList: null,
      files: [],
      test: null,
      addFileList: null,

      rules: [
        (value) => !!value || '제목을 입력해 주세요',
        (value) => (value && value.length >= 1) || '제목을 입력해 주세요'
      ],
      status: {
        titleStatus: true,
        contentStatus: true,
        readStatus: false,
        fileStatus: false,
        commentStatus: false
      },
      titleText: '',
      contentText: '',
      temp: {
        title: null,
        content: null
      },
      comment: null,
      updateCommentText: null,
      commentTemp: {
        comment: null,
        commId: null
      },
      commentItems: ['수정', '삭제']
    }
  },
  created () {
    /* 처음 페이지 들어왔을 때 axios를 통해 데이터 가져오기 */
    this.init()
  },
  methods: {
    /* created */
    async init () {
      let res = await axios.get(DEV_URL + '/' + this.$route.params.postsId)
      if (res.data != null && res.data !== '' && res.headers['content-length'] !== 0) {
        this.post = res.data
        this.titleText = this.post.title
        this.contentText = this.post.content
        this.fileList = this.post.files
      } else if (
        res.data == null ||
          res.data === '' ||
          res.headers['content-length'] === 0
      ) {
        /* 해당 게시물이 없을 경우 삭제 처리 */
        alert('해당 게시물은 삭제 되었습니다.')
        router.replace({ name: 'posts' })
      }
    },
    /* 전체 리스트로 돌아가는 메소드 */
    goList () {
      if (this.status.readStatus) {
        if (window.confirm('수정중인 데이터가 날아갑니다. 떠나시겠습니까?')) {
          this.$router.replace({ name: 'posts' })
        }
      } else {
        this.$router.push({ name: 'posts' })
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
      this.status.titleStatus = !this.status.titleStatus
      this.status.contentStatus = !this.status.contentStatus
      this.status.readStatus = !this.status.readStatus
      this.status.fileStatus = !this.status.fileStatus
    },
    /* 등록 메소드 */
    async updatePost () {
      // update logic
      await axios.put(`${DEV_URL}/${this.$route.params.postsId}`, {
        title: this.titleText,
        content: this.contentText
      })
      this.addFiles()
      this.changeStatus()
    },
    /* 삭제 메소드 */
    deletePost () {
      /* 삭제 axios */
      if (window.confirm('삭제 하시겠습니까?')) {
        axios.delete(DEV_URL + '/' + this.$route.params.postsId).then((res) => {
          if (res.status === 200) {
            alert('삭제되었습니다.')
            router.replace({ name: 'posts' })
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
    addFiles () {
      if (this.addFileList && this.addFileList && this.addFileList[0]) {
        const formData = new FormData()
        for (let i = 0; i < this.addFileList.length; i++) {
          formData.append('files', this.addFileList[i])
        }
        axios
          .post(DEV_URL + '/' + this.$route.params.postsId + '/files', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
          .then((res) => {
            this.fileList = res.data
            this.addFileList = null
          })
          .catch((err) => {
            console.log(err)
          })
          .then(() => {
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
    /** v-on method */
    inputComment (value) {
      let inputText = value
      this.comment = inputText
    },
    setComment (value) {
      this.updateCommentText = value
    },
    /* 댓글 추가 */
    async editComment () {
      let response = await axios.post(`${DEV_URL}/${this.$route.params.postsId}/comm`, {
        content: this.comment
      })
      if (response.status === 200) {
        this.selectCommentList()
      }
    },
    /* 댓글 삭제 */
    async deleteComment (commId) {
      if (!confirm('삭제 하시겠습니까?')) return
      let response = await axios.delete(`${DEV_URL}/${this.$route.params.postsId}/comm/${commId}`)
      if (response.status === 200) {
        this.selectCommentList()
      }
    },
    /* 댓글 수정 */
    updateCommentBtn (commId) {
      this.currentId = commId
      this.status.commentStatus = !this.status.commentStatus
    },
    async updateComment (commId) {
      let res = await axios.put(`${DEV_URL}/${this.$route.params.postsId}/comm/${commId}`, {content: this.updateCommentText})
      if (res === 200) {
        this.cancelEdittingComment()
        this.selectCommentList()
      }
    },
    /* 댓글 수정 취소 */
    cancelEdittingComment () {
      this.status.commentStatus = !this.status.commentStatus
      this.currentId = 0
    },
    /* 댓글 조회 */
    async selectCommentList () {
      let response2 = await axios.get(`${DEV_URL}/${this.$route.params.postsId}/comm`)
      this.post.comments = response2.data
    },
    chooseCommentStatus (event) {
      let text = event.target.innerText
      let commId = event.target.id
      if (text === '수정') {
        this.updateCommentBtn(commId)
      } else if (text === '삭제') {
        this.deleteComment(commId)
      }
    }
  }
}
</script>

<style scoped>
.comment-area {
  border: 1px solid black;
  width: 86%;
  margin-left: 70px;
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>
