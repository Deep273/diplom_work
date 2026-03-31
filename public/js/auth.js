window.auth = firebase.auth();

auth.onAuthStateChanged(user => {
    if (!user) {
        window.location.href = 'login';
    } else {
        console.log("LOGGED IN:", user.email);
    }
});
