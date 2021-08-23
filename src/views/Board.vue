<template>
  <v-app>
<!-- date picker-->
<v-row class="pl-12">
      <!-- 한칸 띄우기-->
      <v-spacer/>
      <!-- 검색 필드 -->
      <v-col cols="3" sm="3" md="3" class="mt-2">
            <v-text-field
              label="검색"
              outlined
              dense
              v-model="keyword"
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
      <v-btn @click="deleteDate()" class="mt-5" icon  color="rgb(33,33,33)">
        <v-icon>mdi-close-circle-outline</v-icon>
      </v-btn>
      <v-btn @click="testt()" class="ml-5 mt-5" icon color="rgb(33,33,33)">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <!-- 버튼-->
      <!-- 한칸 띄우기 -->
      <v-spacer/>
</v-row>
    <template>
      <v-simple-table fixed-header height="800px">
        <template v-slot:default>
          <thead>
            <tr style="border-bottom:1px solid black'">
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
    },
    testt () {
      alert(`${this.date} // ${this.keyword}`)
    },
    deleteDate () {
      this.date = []
      this.keyword = null
    }
  }
}
</script>
