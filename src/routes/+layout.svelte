<script>
  import "../app.scss";
  import Nav from "../components/nav.svelte";
</script>

<Nav />

<div class="container mt-5">
  <slot />
</div>

<footer></footer>

<style>
  footer {
    height: 100px;
  }
</style>
