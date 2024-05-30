const pagesController = module.exports;

pagesController.getHomePage = async (req, res) => {
    res.render('index', { title: 'Dashboard' });
}

pagesController.login = async (req, res) => {
    res.render('login', { title: 'Login' });
}

pagesController.user = async (req, res) => {
    res.render('app/user/index', { title: 'User' });
}

pagesController.request = async (req, res) => {
    res.render('app/user/request', { title: 'Request' });
}

pagesController.reader = async (req, res) => {
    res.render('app/reader', { title: 'Reader' });
}

pagesController.readerdashboard = async (req, res) => {
    res.render('app/reader/dashboard', { title: 'Dashboard' });
}


