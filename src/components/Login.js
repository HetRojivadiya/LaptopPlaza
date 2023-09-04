export default function Login({setLogin}) {
  return (
    <div class="vh-100 d-flex justify-content-center align-items-center">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-12 col-md-8 col-lg-6">
          <div class="card bg-white">
            <div class="card-body p-5">
              <form class="mb-3 ">
                <h2 class="fw-bold">LaptopPlaza</h2>
                <div class="mb-3 my-3">
                  <label for="email" class="form-label ">Email address</label>
                  <input type="email" class="form-control" id="email" placeholder="name@example.com"/>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label ">Password</label>
                  <input type="password" class="form-control" id="password" placeholder="*******"/>
                </div>
                <p class="small"><a class="text-primary" href="forget-password.html">Forgot password?</a></p>
                <div class="d-grid">
                  <button class="btn btn-outline-dark" type="submit" onClick={(e)=>{e.preventDefault();setLogin(true)}}>Login</button>
                </div>
              </form>
              <div>
                <p class="mb-0  text-center">Don't have an account? <a href="signup.html" class="text-primary fw-bold">Sign
                    Up</a></p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
