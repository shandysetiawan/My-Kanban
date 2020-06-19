<template>
    <section id="navbarSection">
<nav class="navbar navbar-expand-lg navbar-light bg-dark">
  <p class="navbar-brand color-white text-light">MY KANBAN</p>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
  
      <li class="nav-item">
  <p class="navbar-brand text-light">WELCOME {{emails}}</p>
      </li>
  
    </ul>
  </div>
          <GoogleLogin class="button btn-danger btn-lg" :params="params" :logoutButton=true :onSuccess="logOutUser">Logout</GoogleLogin>
</nav>

<section>
  <br>
</template>

<script>

import GoogleLogin from 'vue-google-login';

export default {
    name:"Navbar",
    components:{GoogleLogin},
    props: ["emails"],
    data() {
            return {
                // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
                params: {
                    client_id: "146593526403-6ft09orv28779ebcdhso77to554ltsdb.apps.googleusercontent.com"
                },
                // only needed if you want to render the button with the google ui
                renderParams: {
                    width: 250,
                    height: 50,
                    longtitle: true
                }
            }
        },
    methods: {

  logOutUser(){    
  
     localStorage.removeItem('token')
     localStorage.removeItem('emailUser')
     localStorage.removeItem('idUser')
      this.$emit("logoutsuccess");
    },


    }
}
</script>

