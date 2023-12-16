<script>
  import { signInWithEmailAndPassword, signOut } from "firebase/auth";
  import "../app.scss";
  import Modal from "../components/General/modal.svelte";
  import Newsletter from "../components/Sections/newsletter.svelte";
  import { auth, db } from "../firebase";
  import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
  import { isLoggedIn } from "../stores";
  import { page } from "$app/stores";
  import ImagePreview from "../components/Modals/imagePreview.svelte";

  function logout() {
    signOut(auth);
  }

  auth.onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      isLoggedIn.update(() => true);
    } else {
      // No user is signed in.
      isLoggedIn.update(() => false);
    }
  });

  $: ifLoggedInClass = $isLoggedIn ? "" : "d-none";
</script>

<div class="body-container">
  <nav>
    <div class="container header">
      <span>
        <!-- Hello {$user?.uid} -->
        <a href="/" class="logo-container">
          <!-- <h1 class="nav-font">Beth Owen Watercolors</h1> -->
          <img
            src="Logos/Logo with white lettering and transparent background.png"
            class="headerImg"
          />
        </a>
      </span>
      <span class="links d-flex flex-wrap align-items-baseline">
        <div>
          <div
            class="dropdown-toggle nav-font"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Paintings
          </div>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="/originals"
              ><a class="main d-block dropdown-item" href="/originals"
                >Originals</a
              >
              <span class="dropdown-header">Available as fine art giclee</span>
            </a>

            <div class="dropdown-divider"></div>
            <a class="dropdown-item main" href="/reproductions">Reproductions</a
            >
          </div>
        </div>
        <a class="nav-font main" href="/commissions">Commissions</a>
        <a class="nav-font main" href="/classes">Classes</a>
        <a class="nav-font main" href="/about">About</a>
        <a class="nav-font main" href="/contact">Contact</a>
        <i
          class="fa fa-sign-out text-white logout {ifLoggedInClass}"
          on:click={logout}
        ></i>
      </span>
    </div>
  </nav>

  {#if $page.route.id.includes("/login")}
    <div>
      <slot />
    </div>
  {:else}
    <div>
      <slot />
    </div>
    <Newsletter />
  {/if}

  <footer>
    <div class="container d-flex justify-content-center align-items-center">
      <img src="Logos/Watermark.png" alt="" />
    </div>
  </footer>
</div>

<ImagePreview />

<!-- <Modal /> -->

<style lang="scss">
  footer {
    .container {
      height: 100%;
    }
    img {
      width: 205px;
    }
  }
  .headerImg {
    margin: 15px 0px;
    width: 160px;
  }
  .body-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .nav-font {
    color: white;
  }
  .dropdown-item {
    padding: 2px;
    background-color: transparent;
  }
  .dropdown-toggle {
    margin-right: 7px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
    &::after {
      /* opacity: 0 */
      display: none;
    }
  }
  nav {
    z-index: 1;
    height: fit-content;
    background: #000;
    position: sticky;
    top: 0px;
    /* translate: 0px 100%; */
    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      .logout {
        padding: 10px;
        cursor: pointer;
      }
      .links {
        justify-content: right;
      }
      .main {
        margin: 0px 4px;
        text-decoration: none;
        &:hover:not(.logo-container) {
          text-decoration: underline;
        }
      }
      .logo-container {
        text-decoration: none;
      }
    }
  }
  .logo-container {
    font-style: italic;
  }
  footer {
    height: 50px;
    margin-top: auto;
    background-color: #000;
  }
</style>
