<template>
  <v-app>
    <h1 class="text-4">등록 페이지</h1>
    <v-container>
      <!-- 제목 -->
      <v-row class="justify-center">
        <v-col md="10">
          <v-text-field
            label="제목"
            filled
            placeholder="제목을 입력해 주세요"
            :rules="rules"
            hide-details="auto"
            v-model="title"
          ></v-text-field>
        </v-col>
      </v-row>
      <!-- /제목 -->
      <!-- 내용 -->
      <v-row class="justify-center">
          <v-col md="10">
          <v-textarea
            name="input-7-1"
            filled
            label="내용"
            placeholder="내용을 입력해 주세요"
            auto-grow
            v-model="content"
          ></v-textarea>
          </v-col>
      </v-row>
      <v-row class="justify-center">
        <!-- file upload-->
        <v-col md="10">
        <v-file-input
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
        <!-- /file upload-->
        </v-col>
      </v-row>
      <v-row>
        <v-col md="3">
        <v-btn @click="toList()">목록</v-btn>
        </v-col>
        <v-col md="8" class="text-right pr-3">
        <v-btn @click="cancel()">취소</v-btn>
        <v-btn @click="write()">등록</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios'
import router from '@/router/index.js'

const DEV_URL = 'http://localhost:9090/rest/api/v1'

export default {
  data () {
    return {
      files: [],
      test: null,
      rules: [
        (value) => !!value || '제목을 입력해 주세요',
        (value) => (value && value.length >= 1) || '제목을 입력해 주세요'
      ],
      title: null,
      content: null
    }
  },
  methods: {
    /** 목록으로 돌아가기 */
    toList () {
      if (confirm('목록으로 돌아가면 작성내용이 저장되지 않습니다. 목록으로 가시겠습니까?')) {
        router.replace({name: '/posts'})
      }
    },
    /** 작성 취소 메소드 */
    cancel () {
      if (confirm('작성내용이 저장되지 않습니다. 취소하시겠습니까?')) {
        router.replace({name: 'posts'})
      }
    },
    /** 작성 메소드 */
    write () {
      /** 제목 입력 체크 */
      if (this.title == null || this.title === '') {
        alert('제목을 입력해 주세요')
        return false
      }
      /** 데이터 formData로 formattig */
      const formData = new FormData()
      formData.append('title', this.title)

      this.content == null ? formData.append('content', '') : formData.append('content', this.content)
      if (this.files && this.files[0]) {
        for (let i = 0; i < this.files.length; i++) {
          formData.append('file', this.files[i])
        }
      }
      /** 비동기 통신 */
      axios.post(DEV_URL + '/posts', formData, {headers: {'Content-Type': 'multipart/form-data'}}).then((res) => {
        if (res.status === 200) {
          router.replace({name: 'detail', params: { postsId: res.data }})
        }
      })
    },
    uploadFiles (file) {
      console.log(file)
      this.files = [...file]
      console.log(this.files)
    }
  }
}
</script>
