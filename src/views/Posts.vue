<template>
  <v-app>
<!-- date picker-->
<v-row class="pl-12">
      <!-- 한칸 띄우기-->
      <v-spacer/>
      <!-- // -->
        <!-- 검색 select -->
        <v-col md="2">
        <v-select
          :items="items"
          label="검색 종류"
          class="mt-2 mr-4"
          v-model="keyword"
        ></v-select>
        </v-col>
        <!-- /검색 select-->
      <!-- 검색 필드 -->
      <v-col cols="3" sm="3" md="3" class="mt-2">
            <v-text-field
              label="검색"
              outlined
              dense
              v-model="search.word"
            ></v-text-field>
      </v-col>
      <!-- /검색 필드-->
      <v-col cols="2" sm="2" md="2">
        <!-- modal picker-->
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="300px"
        >
          <!-- /modal picker -->
          <!--label -->
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateRangeText"
              label="날짜 검색"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <!-- label -->
          <!-- date picker-->
          <v-date-picker no-title scrollable v-model="date" range>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="cancelDate()">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
          <!-- date picker-->
        </v-menu>
        <!-- /menu-->
      </v-col>
      <!-- 버튼 -->
      <v-row>
        <!-- 검색 취소 -->
        <v-btn @click="deleteWords()" class="mt-9 ml-10" icon  color="rgb(33,33,33)">
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>
        <!-- 리로드 : 전체 검색으로 -->
        <v-btn @click="reloadSearch()" class="mt-9 ml-3" icon  color="rgb(33,33,33)">
          <v-icon>mdi-restore</v-icon>
        </v-btn>
        <!-- 검색하기 -->
        <v-btn @click="searchKeyword()" class="ml-4 mt-9" icon color="rgb(33,33,33)">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <!-- 버튼-->
        <!-- 한칸 띄우기 -->
      </v-row>
      <v-row class="justify-left pt-2">
           <v-btn
              fab
              grey
              small
              @click="write()"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
      </v-row>
</v-row>
    <template>
      <v-simple-table fixed-header height="700px">
        <template v-slot:default>
          <thead>
            <tr style="border-bottom:1px solid black'">
              <th class="text-center">번호</th>
              <th class="text-center text-h5">제목</th>
              <th class="text-right text-h5">작성자</th>
              <th class="text-center text-h5">작성 일</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item) in list"
              :key="item.postsId"
              @click="postDetail(item.postsId)"
            >
              <!-- <td>{{ index + 1 }}</td> -->
              <td>{{ item.postsId }}</td>
              <td class="text-center">{{ item.title }} {{item.comments.length != 0? `[${item.comments.length}]` : null}}</td>
              <td class="text-right">{{ item.regName }}</td>
              <td class="text-center">{{ item.modifyDate }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </template>
  </v-app>
</template>

<script>
import axios from 'axios'
import router from '@/router/index.js'

const DEV_URL = 'http://localhost:9090/rest/api/v1'

export default {
  data () {
    return {
      date: [],
      menu: false,
      modal: false,
      menu2: false,
      items: ['작성자', '제목', '내용', '제목 + 내용'],
      search: {
        word: null,
        keyword: null,
        startDate: '',
        endDate: ''
      },
      keyword: null,
      list: []
    }
  },
  created () {
    axios.get(DEV_URL + '/posts').then((res) => {
      this.list = res.data
      console.log(this.list)
    })
  },
  computed: {
    /** date formatting */
    dateRangeText () {
      return this.date.join(' ~ ')
    }
  },
  methods: {
    /** 날짜 선택 취소 */
    cancelDate () {
      this.date = []
      this.menu = false
      this.$refs.menu.save(this.date)
    },
    /** 상세 페이지 */
    postDetail (index) {
      this.$router.push({name: 'detail', params: { postsId: index }})
    },
    /** 검색  */
    searchKeyword () {
      this.formattingWords()
      axios.get(`${DEV_URL}/posts?keyword=${this.search.keyword}&word=${this.search.word}&startDate=${this.search.startDate}&endDate=${this.search.endDate}`).then(

        (res) => { this.list = res.data })
    },
    /* search formatting */
    formattingWords () {
      this.date[0] === undefined ? this.search.startDate = '' : this.search.startDate = this.date[0]
      this.date[1] === undefined ? this.search.endDate = '' : this.search.endDate = this.date[1]
      switch (this.keyword) {
        case '제목': this.search.keyword = 'title'
          break
        case '작성자': this.search.keyword = 'reg-user'
          break
        case '내용': this.search.keyword = 'content'
          break
        case '제목 + 내용': this.search.keyword = 'all'
          break
      }
    },
    /** 검색 취소 */
    deleteWords () {
      this.date = []
      this.search.word = null
      this.search.keyword = null
    },
    /* 검색 리로드 */
    reloadSearch () {
      axios.get(`${DEV_URL}/posts`).then((res) => { this.list = res.data })
      this.deleteWords()
    },
    /* 검색 폼 이동 */
    write () {
      router.push({name: 'write'})
    }
  }
}
</script>
