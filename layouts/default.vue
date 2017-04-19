<template>
  <div class="container-fluid">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"/>
            <span class="icon-bar"/>
            <span class="icon-bar"/>
          </button>
          <router-link class="navbar-brand" :to="{name: 'index'}">Invoicing</router-link>
        </div>
        <div class="collapse navbar-collapse" id="navbar">
          <ul class="nav navbar-nav">
            <li role="presentation"><router-link :to="{name: 'index'}">Home</router-link></li>
          </ul>
        </div>
      </div>
    </nav>
    <main>
      <nuxt/>
    </main>
  </div>
</template>

<style src="bootstrap/dist/css/bootstrap.css"/>
