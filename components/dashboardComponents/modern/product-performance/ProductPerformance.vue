<script setup lang="ts">

const select = ref("March")
const items = ref(["March", "April", "May", "June"])

const monthtable = ref([
  {
    img: "1.jpg",
    activestate: "",
    leadname: "Sunil Joshi",
    leademail: "Web Designer",
    projectname: "Elite Admin",
    statuscolor: "blue lighten-1 white--text",
    statustext: "Low",
    money: "$3.9K",
  },
  {
    img: "2.jpg",
    activestate: "",
    leadname: "Andrew",
    leademail: "Project Manager",
    projectname: "Real Homes",
    statuscolor: "info",
    statustext: "Medium",
    money: "$23.9K",
  },
  {
    img: "3.jpg",
    activestate: "",
    leadname: "Bhavesh patel",
    leademail: "Developer",
    projectname: "MedicalPro Theme",
    statuscolor: "warning",
    statustext: "High",
    money: "$12.9K",
  },
  {
    img: "4.jpg",
    activestate: "",
    leadname: "Nirav Joshi",
    leademail: "Frontend Eng",
    projectname: "Elite Admin",
    statuscolor: "error",
    statustext: "Low",
    money: "$10.9K",
  },
  {
    img: "5.jpg",
    activestate: "",
    leadname: "Micheal Doe",
    leademail: "Content Writer",
    projectname: "Helping Hands",
    statuscolor: "success",
    statustext: "Low",
    money: "$12.9K",
  },
])

</script>

<template>
  <v-card flat class="w-100">
    <v-card-text>
      <div class="d-sm-flex align-center">
        <div>
          <h2 class="title text-h6 font-weight-medium">สถิติยอดขายรายคน</h2>
        </div>
        <v-spacer></v-spacer>
        <div class="ml-auto">
          <v-select
            v-model="select"
            :items="items"
            variant="outlined"
            density="compact"
            hide-details
          ></v-select>
        </div>
      </div>
      <v-table class="month-table mt-5">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="font-weight-medium text-subtitle-1">Assigned</th>
              <th class="font-weight-medium text-subtitle-1">Name</th>
              <th class="font-weight-medium text-subtitle-1">Priority</th>
              <th class="font-weight-medium text-subtitle-1">Budget</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in monthtable"
              :key="item.leadname"
              :class="item.activestate"
              class="month-item"
            >
              <td>
                <div class="d-flex align-center">
                  <v-avatar size="40">
                    <img
                      :src="`/images/users/${item.img}`"
                      :alt="item.img"
                      width="40"
                  /></v-avatar>
                  <div class="mx-3">
                    <h4 class="font-weight-medium text-subtitle-1 text-no-wrap">
                      {{ item.leadname }}
                    </h4>
                  </div>
                </div>
              </td>
              <td>
                <h5
                  class="font-weight-medium text-no-wrap text-body-2 text-grey-darken-1"
                >
                  {{ item.projectname }}
                </h5>
              </td>
              <td>
                <v-chip
                  class="ma-2"
                  :color="item.statuscolor"
                  size="small"
                  label
                  >{{ item.statustext }}</v-chip
                >
              </td>
              <td>
                <h4>{{ item.money }}</h4>
              </td>
            </tr>
          </tbody>
        </template>
      </v-table>
    </v-card-text>
  </v-card>
</template>
