<template>
    <div>
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/login">Login</router-link> |
            <router-link to="/register">Register</router-link> 
        </div>
        <router-view />
    </div>
</template>

<style>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #e6bf15;
}
</style>
