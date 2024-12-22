'use client'

import React from 'react';
// import { useRouter } from 'next/navigation';
import styles from './AccountModal.module.css';
import { Paper } from '@mui/material';
// import { useAppContext } from '../../providers/AppProvider';
// import {
//     InputAdornment
// } from '@mui/material';

// import {
//     VisibilityOffOutlined, VisibilityOutlined
// } from '@mui/icons-material';

// import {  FormTextField } from '../Styled';
import { useAppContext } from '../../providers/AppProvider';
import Link from 'next/link';
import Close from '@mui/icons-material/Close';
import { StyledIconButton } from '../Styled';

interface AccountModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AccountModal: React.FC<AccountModalProps> = ({ isOpen,
    onClose
}) => {
    // const Router = useRouter(); 
    const { user } = useAppContext();

    // const { setInfo } = useAppContext();

    // const [deleteAccount, setDeleteAccount] = useState('');
    // const [newDisplayName, setNewDisplayName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [showPassword, setShowPassword] = useState(false);
    // const [errors, setErrors] = useState({ displayName: '', email: '', password: '' });
    // const screen = '';

    // const handleClickShowPassword = () => {
    //     setShowPassword(prev => !prev);
    // };

    // const clearValues = () => {
    //     setDeleteAccount('');
    //     setEmail('');
    //     setErrors({ displayName: '', email: '', password: '' });
    //     setNewDisplayName('');
    //     setPassword('');
    //     setShowPassword(false);
    //     onClose();
    // }

    // const handleRemoveDisplayName = () => {
    //     // updateUserDisplayName('');
    //     clearValues();
    // }

    // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    // setErrors({ displayName: '', email: '', password: '' });
    // try {
    //     switch (screen) {
    //         case "email":
    //             if (email === user?.email) {
    //                 setErrors({ ...errors, email: 'Email is the same as current email' });
    //                 return;
    //             }
    //             // await updateUserEmail(email, password);
    //             clearValues();
    //             setInfo('Please verify your new email address');
    //             break;

    //         case "password":
    //             if (user?.email) {
    //                 // await sendPasswordReset(user?.email);
    //                 clearValues();
    //                 setInfo('Password reset link sent to your email');
    //             }
    //             break;

    //         case "deleteAccount":
    //             // await deleteUserAccount(password);
    //             clearValues();
    //             Router.push('/');
    //             setInfo('Account deleted successfully');
    //             break;

    //         case "displayName":
    //             if (newDisplayName === user?.displayName) {
    //                 setErrors({ ...errors, displayName: 'Display name is the same as current display name' });
    //                 return;
    //             }
    //             // await updateUserDisplayName(newDisplayName);
    //             clearValues();
    //             setInfo('Display name updated successfully');
    //             break;
    //         case "verification":
    //             if (email !== user?.email) {
    //                 setErrors({ ...errors, email: 'Email is not the same as current email' });
    //                 return;
    //             }
    //             // await sendUserVerification();
    //             clearValues();
    //             setInfo('Please verify your new email address');
    //             break;
    //         default:
    //             console.error('Unknown screen:', screen);
    //     }
    // } catch (error) {
    //     console.log(error);
    //     setInfo('An error occurred: ' + error);
    // }
    // };

    // const isButtonEnabled = () => {
    // if (screen === "email") {
    //     return email.trim() !== '' && password.trim() !== '';
    // } else if (screen === "password") {
    //     return user?.email === email;
    // } else if (screen === "delete") {
    //     return deleteAccount === "delete-my-account" && password.trim() !== '';
    // } else if (screen === "displayName") {
    //     return newDisplayName.trim() !== '' && newDisplayName.length > 1;
    // } else if (screen === "verification") {
    //     return email.trim() !== ''
    // }
    //     return false;
    // };

    // const FormHeader: React.FC = (screen) => {
    //     switch (screen) {
    //         case "email":
    //             return (
    //                 <React.Fragment>
    //                     <h1>Update email</h1>
    //                     {
    //                         user?.email && (
    //                             <p>{user.email}</p>
    //                         )
    //                     }
    //                     <p>To continue, type your new email and your password below</p>
    //                 </React.Fragment>
    //             );
    //         case "password":
    //             return (
    //                 <React.Fragment>
    //                     <h1>Reset password</h1>
    //                     <p>Password reset link will be sent to {user?.email}</p>
    //                     <p>To continue, type your email below</p>
    //                 </React.Fragment>
    //             );
    //         case "delete":
    //             return (
    //                 <React.Fragment>
    //                     <h1>Delete account</h1>
    //                     <p>We will delete your account and all data associated with the email &apos;{user?.email}&apos;</p>
    //                     <p>To continue, type &apos;delete-my-account&apos; and your password below</p>
    //                 </React.Fragment>
    //             );
    //         case "displayName":
    //             return (
    //                 <React.Fragment>
    //                     <h1>Update display name</h1>
    //                     {user?.displayName && (<p>{user.displayName}</p>)}
    //                     <p>To continue, type your new display name below</p>
    //                 </React.Fragment>
    //             );
    //         case "verification":
    //             return (
    //                 <React.Fragment>
    //                     <h1>Email verification</h1>
    //                     <p>Email verification link will be sent to &apos;{user?.email}&apos;</p>
    //                     <p>To continue, type your email below</p>
    //                 </React.Fragment>
    //             );
    //         default:
    //             return null;
    //     }
    // };


    // function pushTo(screen: string): void {
    //     console.log(screen);
    // }

    return (
        isOpen && (
            <div className={styles.modal}>
                <Paper className={styles.wrapper}>
                    <div className={styles.header}>
                        <div className={styles.headerContainerLeading}>
                            <h1>Account</h1>
                        </div>
                        <div className={styles.headerContainerTrailing}>
                            <div className={styles.closeIconButtonContainer}><StyledIconButton onClick={onClose}><Close /></StyledIconButton></div>
                        </div>
                    </div>
                    <div className={styles.container}>
                        <div className={styles.containerItem}>
                            <h2>Personal Info</h2>
                        </div>
                        {
                            user?.emailVerified === false && (
                                <h3>Verify Account!</h3>
                            )
                        }
                        <div className={styles.containerItemBtn}>
                            <h3>Email {user?.email && (<h3> - </h3>)}{user?.email}</h3>
                        </div>
                        <div className={styles.containerItemBtn}>
                            <h3>Display name {user?.email && (<h3> - </h3>)}{user?.displayName}</h3>
                        </div>
                        <div className={styles.containerItem}>
                            <h2>Data & Security</h2>
                        </div>
                        <div className={styles.containerItemBtn}>
                            <h3>Password</h3>
                        </div>
                        <div className={styles.containerItemBtn}>
                            <h3>Download data</h3>
                        </div>
                        <div className={styles.containerItemBtn}>
                            <h3>Delete account</h3>
                        </div>
                    </div>
                    <div className={styles.footer}>
                        <p>
                            Need help with something else, please contact <Link href="mailto:support@machinename.dev?subject=Support%20Request&body=Please%20describe%20your%20issue%20here." className={styles.textTerms}>support</Link>
                        </p>
                        <p><Link href={'/Machine Name - Privacy Policy.pdf'} className={styles.textTerms}
                            target="_blank" rel="noopener noreferrer">Terms of Service</Link> & <Link href={'/Machine Name - Terms of Service.pdf'}
                                className={styles.textTerms} target="_blank" rel="noopener noreferrer">Privacy Policy</Link></p>
                    </div>
                    {/* {FormHeader(screen)} */}
                    {/* <form className={styles.form} onSubmit={handleSubmit}> */}

                    {/* {screen === "verification" && (
                            <FormTextField
                                type="email"
                                id="verification"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                variant="standard"
                                label="Email"
                                autoComplete='off'
                            />
                        )}
                        {screen === "email" && (
                            <FormTextField
                                type="email"
                                id={screen}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                variant="standard"
                                label="New email"
                                autoComplete='off'
                            />
                        )}
                        {screen === "password" && (
                            <FormTextField
                                type='email'
                                id={screen}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                variant="standard"
                                label="Email"
                                autoComplete='off'
                            />
                        )}
                        {screen === "delete" && (
                            <FormTextField
                                type="text"
                                id={screen}
                                value={deleteAccount}
                                onChange={(event) => setDeleteAccount(event.target.value)}
                                label="delete-my-account"
                                autoComplete='off'
                                variant="standard"
                            />
                        )}
                        {screen === "displayName" && (
                            <FormTextField
                                type="text"
                                id={screen}
                                value={newDisplayName}
                                onChange={(event) => setNewDisplayName(event.target.value)}
                                autoComplete='off'
                                variant="standard"
                                label="New display name"
                            />
                        )}
                        {screen !== "displayName" && screen !== "verification" && screen !== "password" && (
                            <FormTextField
                                type={showPassword ? 'text' : 'password'}
                                id="formPassword"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete='off'
                                variant="standard"
                                label="Password"
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {showPassword ? <VisibilityOffOutlined onClick={handleClickShowPassword} sx={{ color: 'gray' }} /> : <VisibilityOutlined onClick={handleClickShowPassword} sx={{ color: 'gray' }} />}
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                        )}
                        <React.Fragment>
                            {errors.email && (<p className={styles.textError} aria-live="polite">{errors.email}</p>)}
                            {errors.password && (<p className={styles.textError} aria-live="polite">{errors.password}</p>)}
                            {authError && (<p className={styles.textError} aria-live="polite">{authError}</p>)}
                            {                       
                                screen === "password" ?
                                    <StyledButton className={styles.button} disabled={!isButtonEnabled()} type="submit">
                                        Send                      
                                    </StyledButton>
                                    :
                                    <StyledButton className={styles.button} disabled={!isButtonEnabled()} type="submit">
                                        {screen === "verification" ? "Resend" : "Submit"}
                                    </StyledButton>
                            }
                            {
                                (screen === "displayName" && user?.displayName) && (
                                    <StyledButton className={styles.button} type="button" onClick={handleRemoveDisplayName}>
                                        Remove Display Name
                                    </StyledButton>
                                )
                            }
                            <StyledButton className={styles.button} onClick={clearValues} type="reset">
                                Cancel
                            </StyledButton>
                        </React.Fragment> */}

                    {/* </form> */}
                </Paper>
            </div>
        )
    );
}
export default AccountModal;