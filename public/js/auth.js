if (localStorage.getItem('admin_logged') !== 'true') {
    window.location.href = 'login';
}

function logout(){
    localStorage.removeItem('admin_logged');
    localStorage.removeItem('admin_login');
    window.location.href = 'login';
}
