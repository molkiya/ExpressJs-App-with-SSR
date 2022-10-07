import passport from "passport";

export const loginController = async (req, res) => req.isAuthenticated() ? res.redirect('/') : res.render('../views/pages/login.ejs')

export const loginControllerPost = passport.authenticate(
    'local',
    {
        failureRedirect: '/login-failure',
        successRedirect: '/user'
    },
    () => console.log()
)

export const loginFailureController = (req, res) => res.redirect('/login')

export const logoutController = async (req, res) => {
    await req.logout()
    res.redirect('/');
}