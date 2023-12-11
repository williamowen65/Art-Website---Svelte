<script>
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { auth } from "../../firebase";
  import { isLoggedIn } from "../../stores";

  let myForm;
  function handleLogin(e) {
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((signInRes) => {
        isLoggedIn.update(() => true);
      })
      .catch((err) => {
        console.log({ err });
      });
  }
</script>

<div class="container mt-5">
  <div class="card p-3">
    <form on:submit={handleLogin} bind:this={myForm}>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          name="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          name="password"
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
        />
      </div>

      <div class="d-flex justify-content-end">
        <button type="Login" class="btn btn-primary">Login</button>
      </div>
    </form>
  </div>
</div>
