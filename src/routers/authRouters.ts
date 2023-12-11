import { Router } from 'express'

import { handleLogin, handleLogout } from '../controllers/authControllers'
import { isLoggedIn, isLoggedOut } from '../middlewares/auth'

const router = Router()
//POST :/auth / login -> login the user
router.post('/login', isLoggedOut, handleLogin)
//POST :/auth / logout -> login the user
router.post('/logout', isLoggedIn, handleLogout)

export default router
