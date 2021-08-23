<template>
<v-app>
         <!-- <template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-date-picker v-model="dates" range></v-date-picker>
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field v-model="dateRangeText" label="Date range" prepend-icon="event" readonly></v-text-field>
      model: {{ dates }}
    </v-col>
  </v-row>
</template> -->
  <v-simple-table fixed-header height="500px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">제목</th>
          <th class="text-right">작성자</th>
          <th class="text-center">작성 일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in desserts" :key="item.name" @click="test(index)" index=index>
          <td class="text-center">{{ item.name }}</td>
          <td class="text-right">{{ item.test1 }}</td>
          <td class="text-center"> {{ item.test2 }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</v-app>
</template>

<script>
export default {
  data () {
    return {
      dates: ['2019-09-10', '2019-09-20'],
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
        }
      ]
    }
  },
  computed: {
    dateRangeText () {
      return this.dates.join(' ~ ')
    }
  },
  methods: {
    test (index) {
      alert(index)
    }
  }
}
</script>
