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
              v-model="word"
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
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
          <!-- date picker-->
        </v-menu>
        <!-- /menu-->
      </v-col>
      <!-- 버튼 -->
      <v-row>
        <!-- 검색 취소 -->
      <v-btn @click="deleteDate()" class="mt-9 ml-10" icon  color="rgb(33,33,33)">
        <v-icon>mdi-close-circle-outline</v-icon>
      </v-btn>
      <!-- 리로드 : 전체 검색으로 -->
      <v-btn @click="deleteDate()" class="mt-9 ml-3" icon  color="rgb(33,33,33)">
        <v-icon>mdi-restore</v-icon>
      </v-btn>
      <!-- 검색하기 -->
      <v-btn @click="testt()" class="ml-4 mt-9" icon color="rgb(33,33,33)">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <!-- 버튼-->
      <!-- 한칸 띄우기 -->
      <v-spacer/>
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
              v-for="(item, index) in desserts"
              :key="index"
              @click="test(index)"
              index="index"
            >
              <td>{{ index + 1 }}</td>
              <td class="text-center">{{ item.name }}</td>
              <td class="text-right">{{ item.test1 }}</td>
              <td class="text-center">{{ item.test2 }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </template>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      date: [],
      menu: false,
      modal: false,
      menu2: false,
      word: null,
      items: ['작성자', '제목', '내용', '제목 + 내용'],
      keyword: null,
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          test1: '작성자',
          test2: 2
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          test1: '작성자',
          test2: 2
        },
        {
          name: 'Eclair',
          calories: 262,
          test1: 1,
          test2: 2
        },
        {
          name: 'Cupcake',
          calories: 305,
          test1: 1,
          test2: 2
        },
        {
          name: 'Gingerbread',
          calories: 356,
          test1: 1,
          test2: 2
        },
        {
          name: 'Jelly bean',
          calories: 375,
          test1: '작성자',
          test2: 2
        },
        {
          name: 'Lollipop',
          calories: 392,
          test1: '작성자',
          test2: 2
        },
        {
          name: 'Honeycomb',
          calories: 408,
          test1: '작성자',
          test2: 2
        },
        {
          name: 'Donut',
          calories: 452,
          test1: '작성자',
          test2: 2
        },
        {
          name: 'KitKat',
          calories: 518,
          test1: '작성자',
          test2: 2
        },
        {
          name: 'Frozen Yogurt',
          calories: 159,
          test1: '작성자',
          test2: 2
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          test1: '작성자',
          test2: 2
        },
        {
          name: 'Eclair',
          calories: 262,
          test1: 1,
          test2: 2
        },
        {
          name: 'Cupcake',
          calories: 305,
          test1: 1,
          test2: 2
        },
        {
          name: 'Gingerbread',
          calories: 356,
          test1: 1,
          test2: 2
        },
        {
          name: 'Jelly bean',
          calories: 375,
          test1: '작성자',
          test2: 2
        },
        {
          name: 'Lollipop',
          calories: 392,
          test1: '작성자',
          test2: 2
        },
        {
          name: 'Honeycomb',
          calories: 408,
          test1: '작성자',
          test2: 2
        },
        {
          name: 'Donut',
          calories: 452,
          test1: '작성자',
          test2: 2
        },
        {
          name: 'KitKat',
          calories: 518,
          test1: '작성자',
          test2: 2
        },
        {
          name: 'Frozen Yogurt',
          calories: 159,
          test1: '작성자',
          test2: 2
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          test1: '작성자',
          test2: 2
        },
        {
          name: 'Eclair',
          calories: 262,
          test1: 1,
          test2: 2
        },
        {
          name: 'Cupcake',
          calories: 305,
          test1: 1,
          test2: 2
        },
        {
          name: 'Gingerbread',
          calories: 356,
          test1: 1,
          test2: 2
        },
        {
          name: 'Jelly bean',
          calories: 375,
          test1: '작성자',
          test2: 2
        },
        {
          name: 'Lollipop',
          calories: 392,
          test1: '작성자',
          test2: 2
        },
        {
          name: 'Honeycomb',
          calories: 408,
          test1: '작성자',
          test2: 2
        },
        {
          name: 'Donut',
          calories: 452,
          test1: '작성자',
          test2: 2
        },
        {
          name: 'KitKat',
          calories: 518,
          test1: '작성자',
          test2: 2
        },
        {
          name: 'Gingerbread',
          calories: 356,
          test1: 1,
          test2: 2
        },
        {
          name: 'Jelly bean',
          calories: 375,
          test1: '작성자',
          test2: 2
        },
        {
          name: 'Lollipop',
          calories: 392,
          test1: '작성자',
          test2: 2
        },
        {
          name: 'Honeycomb',
          calories: 408,
          test1: '작성자',
          test2: 2
        },
        {
          name: 'Donut',
          calories: 452,
          test1: '작성자',
          test2: 2
        },
        {
          name: 'KitKat',
          calories: 518,
          test1: '작성자',
          test2: 2
        }
      ]
    }
  },
  computed: {
    dateRangeText () {
      return this.date.join(' ~ ')
    }
  },
  methods: {
    test (index) {
      alert(index)
      this.$router.push({name: 'detail', params: { postsId: index }})
    },
    testt () {
      alert(`${this.keyword} // ${this.word} // ${this.date}`)
    },
    deleteDate () {
      this.date = []
      this.word = null
      this.keyword = null
    }
  }
}
</script>
