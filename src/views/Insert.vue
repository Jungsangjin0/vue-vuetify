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
        <v-btn>목록</v-btn>
        </v-col>
        <v-col md="8" class="text-right pr-3">
        <v-btn>취소</v-btn>
        <v-btn>등록</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      files: [],
      test: null,
      rules: [
        (value) => !!value || '제목을 입력해 주세요',
        (value) => (value && value.length >= 1) || '제목을 입력해 주세요'
      ]
    }
  },
  methods: {
    uploadFiles (file) {
      console.log(file)
      this.files = [...file]
      console.log(this.files)
    },
    testt () {
      console.log(this.test)
      const aa = Array.from(this.test)
      console.log(aa)
      // this.test = aa
      this.test = Array.from(this.test)
      console.log(this.test)

      const formData = new FormData()
      formData.append('postsId', 20)
      if (this.files && this.files[0]) {
        for (let i = 0; i < this.files.length; i++) {
          formData.append('files', this.files[i])
        }
      }
      axios.post('http://localhost:9090/rest/api/v1/posts/' + 20 + '/files', formData, {
        header: { 'Content-type': 'multipart/form-date' }
      })
    }
  }
}
</script>
