'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import {
    InputAdornment,
    Divider,
} from '@mui/material';
import {
    Google,
    PersonOutline,
    VisibilityOffOutlined,
    VisibilityOutlined,
} from '@mui/icons-material';
import styles from '../page.module.css';
import { FilledTextField, StyledButton} from '../components/Styled';
import React from 'react';
import { useAppContext } from '../providers/AppProvider';

export default function Login() {
    const { isAppLoading, createUserAccount, logIn, logInWithGoogle, sendPasswordReset, setInfo } = useAppContext();

    const router = useRouter();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isHelp, setIsHelp] = useState<boolean>(false);
    const [isLogin, setIsLogin] = useState<boolean>(true);

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleBackClick = () => {
        router.push('/');
    };

    const handleClearValues = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword(''); setConfirmPassword('');
        setErrors({ email: '', password: '', confirmPassword: '' });
    };

    const handleCreateAccount = async (email: string, password: string, confirmPassword: string) => {
        if (!email.trim()) {
            setErrors({ ...errors, email: 'Email is required' });
            return;
        }
        if (!password.trim()) {
            setErrors({ ...errors, password: 'Password is required' });
            return;
        }
        if (!confirmPassword.trim()) {
            setErrors({ ...errors, confirmPassword: 'Confirm Password is required' });
            return;
        }
        if (password !== confirmPassword) {
            setErrors({ ...errors, confirmPassword: 'Passwords do not match' });
            return;
        }
        await createUserAccount(email, password);
        handleClearValues();
    };

    const handleContinueAsGuest = async (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        router.push('https://www.machinename.dev');
    };

    const handleContinueWithGoogle = async (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            await logInWithGoogle();
            router.push('https://www.machinename.dev');
        } catch (error) {
            console.log(error);
        } finally {
            handleClearValues();
        }
    };

    const handleLogIn = async (email: string, password: string) => {
        if (!password.trim()) {
            setErrors({ ...errors, password: 'Password is required' });
            return;
        }
        await logIn(email, password);
        handleClearValues();
    };

    const handlePasswordReset = async (email: string) => {
        if (!email) {
            setErrors({ ...errors, email: 'Email is required' });
            return;
        }
        await sendPasswordReset(email);
        setInfo('If the email address is registered, a password reset link will be sent to it.');
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors({ email: '', password: '', confirmPassword: '' });

        try {
            if (isHelp) {
                await handlePasswordReset(email);
            } else if (isLogin) {
                await handleLogIn(email, password);
                router.push('https://www.machinename.dev');
            } else {
                await handleCreateAccount(email, password, confirmPassword);
                router.push('https://www.machinename.dev');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const isButtonEnabled = () => {
        if (isHelp) {
            return email.trim() !== '';
        } else if (isLogin) {
            return email.trim() !== '' && password.trim() !== '' && password.length > 0;
        } else {
            return email.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '' && password.length > 7;
        }
    };

    const toggleLoginHelp = () => {
        setIsHelp(prev => !prev);
        handleClearValues();
    };

    const toggleShowPassword = () => {
        setShowPassword(prev => !prev);
    };

    const toggleSwitch = () => {
        setIsLogin(prev => !prev);
        setIsHelp(false);
        handleClearValues();
    };

    if (isAppLoading) {
        return (
            <div className={styles.page}>
                <h1>Loading...</h1>
            </div>
        );
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginHeader}>
                <StyledButton
                    disableRipple={true}
                    type="button"
                    onClick={handleBackClick}>
                    Back
                </StyledButton>
                <StyledButton
                    disableRipple={true}
                    type="button"
                    onClick={toggleSwitch}>
                    {isLogin ? 'Create an account' : 'Already have an account?'}
                </StyledButton>
            </div>
            <div className={styles.loginWrapper}>
                <h1>{isHelp ? 'Log in help' : (isLogin ? 'Log into Machine Name' : 'Create an account')}</h1>
                <div className={isHelp ? styles.loginContainerHelp : styles.loginContainer}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <FilledTextField
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant="standard"
                            label="Email"
                            sx={{ width: '100%' }}
                            autoComplete='off'
                        />
                        {errors.email && (<p aria-live="polite" className={styles.textError}>{errors.email}</p>)}
                        {!isHelp && (
                            <FilledTextField
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                variant="standard"
                                label="Password"
                                autoComplete='off'
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {showPassword ? <VisibilityOffOutlined
                                                    sx={{
                                                        color: 'gray',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={toggleShowPassword} /> : <VisibilityOutlined
                                                    sx={{
                                                        color: 'gray',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={toggleShowPassword} />}
                                            </InputAdornment>
                                        )
                                    },
                                }}
                            />
                        )}
                        {errors.password && (<p aria-live="polite" className={styles.textError}>{errors.password}</p>)}
                        {(!isLogin && !isHelp) && (
                            <FilledTextField
                                type={showPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                variant="standard"
                                label="Confirm Password"
                                sx={{
                                    width: '100%',
                                    color: 'inherit',
                                }}
                            />
                        )}
                        {errors.confirmPassword && (<p aria-live="polite" className={styles.textError}>{errors.confirmPassword}</p>)}
                        <StyledButton variant='contained'  disabled={!isButtonEnabled()} type="submit">
                            {isHelp ? 'Send' : (isLogin ? 'Log in' : 'Create Account')}
                        </StyledButton>
                    </form>
                    {!isHelp && (
                        <React.Fragment>
                            <div className={styles.loginDivider}>
                                <Divider orientation='vertical'>OR</Divider>
                            </div>
                            <div className={styles.loginDividerMobile}>
                                <Divider orientation='horizontal'>OR</Divider>
                            </div>
                            <div className={styles.form}>
                                <StyledButton
                                    variant='contained'
                                onClick={handleContinueWithGoogle} startIcon={<Google />}>
                                    Continue with Google
                                </StyledButton>
                                <StyledButton 
                                    variant='contained'
                                onClick={handleContinueAsGuest} startIcon={<PersonOutline />}>
                                    Continue as Guest
                                </StyledButton>
                            </div>
                        </React.Fragment>
                    )}
                </div>
                {(!isLogin && !isHelp) && (
                    <p>By creating an account, you agree to our <Link href={'/Machine Name - Terms of Service.pdf'}
                        target="_blank" rel="noopener noreferrer">Terms of Service</Link> & <Link href={'Machine Name - Privacy Policy.pdf'}
                            target="_blank" rel="noopener noreferrer">Privacy Policy</Link></p>
                )}
                {isHelp ? (
                    <React.Fragment>
                        <p>
                            Enter your email to receive a password reset link
                        </p>
                        <p>
                            For any other issues, please contact <Link href="">info@machinename.dev</Link>
                        </p>
                    </React.Fragment>
                ) :
                    <React.Fragment>
                        <p>Secure Login with reCAPTCHA subject to Google <Link href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms</Link> & <Link href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy</Link></p>
                    </React.Fragment>
                }
                <StyledButton type="button"
                    disableRipple={true}
                    onClick={toggleLoginHelp}>
                    {isHelp ? 'Back' : 'Log in help'}
                </StyledButton>
            </div>
        </div>
    );
};