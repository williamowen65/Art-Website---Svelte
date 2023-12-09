<nav>
  <div class="container">
    <span>
      <a href="/" class="logo-container">
        <h1>Beth Owen Watercolors</h1>
      </a>
    </span>
    <span class="links d-flex flex-wrap">
      <a href="/originals">Originals</a>
      <a href="/reproductions">Reproductions</a>
      <a href="/commissions">Commissions</a>
      <a href="/classes">Classes</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </span>
  </div>
</nav>

<style lang="scss">
  nav {
    background: #000;
    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .links {
        flex-direction: row-reverse;
      }
      a {
        margin: 0px 2px;
        text-decoration: none;
        &:hover:not(.logo-container) {
          text-decoration: underline;
        }
      }
    }
  }
</style>
