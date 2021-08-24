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
            v-bind:value="contentText"
          ></v-textarea>
          </v-col>
      </v-row>
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

export default {
  data () {
    return {
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
      contentText: 'contentText'

    }
  },
  methods: {
    /* 전체 리스트로 돌아가는 메소드 */
    goList () {
      let check = window.confirm('작성한 내용이 사라집니다 목록으로 가시겠습니까?')
      if (check) {
        this.$router.replace({name: 'board'})
      }
    },
    /* readonly 수정 */
    changeStatus () {
      this.titleStatus = false // title readonly
      this.contentStatus = false // content readonly
      this.readStatus = true // readonly flag
    },
    /* 수정 메소드 */
    updatePost () {
      // update logic
      // axios
      window.alert('등록 메소드')
    },
    /* 삭제 메소드 */
    deletePost () {
      // delete
      window.confirm('삭제 하시겠습니까?')
    },
    /* 수정 취소 메소드 */
    cancelPost () {
      // cancel
      window.alert('취소 메소드')
      // router.replace({name: 'detail', params: { postsId: this.$route.params.postsId }})
      router.reload()
    }
  }
}
</script>
