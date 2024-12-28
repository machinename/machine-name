import React from 'react';
import { IconButton } from '@mui/material';
import styles from './ModelList.module.css';
import { Check, Circle, Star, StarOutlineOutlined } from '@mui/icons-material';

const RecentModels = () => {
    return (
        <div className={styles.models}>
            <div className={styles.model}>
                <div className={styles.modelLeading} >
                    <IconButton
                        size='small'
                        disabled
                    >
                        <Circle
                            fontSize='small'
                            sx={{ color: 'transparent' }} />
                    </IconButton>
                </div>
                <div className={styles.modelCenter}><p>Name</p></div>
                <div className={styles.modelTrailing}><p>Type</p></div>
            </div>
            <div className={styles.model}>
                <div className={styles.modelLeading}>
                    <IconButton
                        size='small'
                        disabled
                    >
                        <Check
                            fontSize='small' sx={{
                                color: '#0070f3'
                            }} />
                    </IconButton>
                    <IconButton
                        size='small'

                    >
                        <StarOutlineOutlined
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log('Starred');
                            }}
                            fontSize='small'
                            sx={{
                                cursor: 'pointer',
                                color: '#0070f3'
                            }} />
                    </IconButton>
                    {/* <Star
                                    sx={{
                                        color: '#0070f3'
                                    }}/> */}
                </div>
                <div className={styles.modelCenter}>
                    <p>model Name</p>
                </div>
                <div className={styles.modelTrailing}>
                    <p>Scikit</p>
                </div>
            </div>
        </div>
    );
};

const StarredModels = () => {
    return (
        <div className={styles.models}>
            <div className={styles.model}>
                <div className={styles.modelLeading} >
                    <IconButton
                        size='small'
                        disabled
                    >
                        <Circle
                            fontSize='small'
                            sx={{ color: 'transparent' }} />
                    </IconButton>
                </div>
                <div className={styles.modelCenter}><p>Name</p></div>
                <div className={styles.modelTrailing}><p>Type</p></div>
            </div>
            <div className={styles.model}>
                <div className={styles.modelLeading}>
                    <IconButton
                        size='small'
                        disabled
                    >
                        <Check
                            fontSize='small' sx={{
                                color: '#0070f3'
                            }} />
                    </IconButton>
                    <IconButton
                        size='small'

                    >
                        <Star
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log('Starred');
                            }}
                            fontSize='small'
                            sx={{
                                cursor: 'pointer',
                                color: '#0070f3'
                            }} />
                    </IconButton>
                </div>
                <div className={styles.modelCenter}>
                    <p>model Name</p>
                </div>
                <div className={styles.modelTrailing}>
                    <p>model ID</p>
                </div>
            </div>
        </div>
    );
};

const AllModels = () => {
    return (
        <div className={styles.models}>
            <div className={styles.model}>
                <div className={styles.modelLeading} >
                    <IconButton
                        size='small'
                        disabled
                    >
                        <Circle
                            fontSize='small'
                            sx={{ color: 'transparent' }} />
                    </IconButton>
                </div>
                <div className={styles.modelCenter}><p>Name</p></div>
                <div className={styles.modelTrailing}><p>Type</p></div>
            </div>
            <div className={styles.model}>
                <div className={styles.modelLeading}>
                    <IconButton
                        size='small'
                        disabled
                    >
                        <Check
                            fontSize='small' sx={{
                                color: '#0070f3'
                            }} />
                    </IconButton>
                    <IconButton
                        size='small'

                    >
                        <StarOutlineOutlined
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log('Starred');
                            }}
                            fontSize='small'
                            sx={{
                                cursor: 'pointer',
                                color: '#0070f3'
                            }} />
                    </IconButton>
                    {/* <Star
                                    sx={{
                                        color: '#0070f3'
                                    }}/> */}
                </div>
                <div className={styles.modelCenter}>
                    <p>model Name</p>
                </div>
                <div className={styles.modelTrailing}>
                    <p>Scikit</p>
                </div>
            </div>
            <div className={styles.model}>
                <div className={styles.modelLeading}>
                    <IconButton
                        size='small'
                        disabled
                    >
                        <Check
                            fontSize='small' sx={{
                                color: '#0070f3'
                            }} />
                    </IconButton>
                    <IconButton
                        size='small'

                    >
                        <StarOutlineOutlined
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log('Starred');
                            }}
                            fontSize='small'
                            sx={{
                                cursor: 'pointer',
                                color: '#0070f3'
                            }} />
                    </IconButton>
                    {/* <Star
                                    sx={{
                                        color: '#0070f3'
                                    }}/> */}
                </div>
                <div className={styles.modelCenter}>
                    <p>model Name 2</p>
                </div>
                <div className={styles.modelTrailing}>
                    <p>TensorFlow</p>
                </div>
            </div>
        </div>
    );
};

const ModelList = () => {
    const [alignment, setAlignment] = React.useState('recent');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
        console.log('New Alignment ', newAlignment);
    };

    const rendermodels = () => {
        switch (alignment) {
            case 'recent':
                return <RecentModels />;
            case 'starred':
                return <StarredModels />;
            case 'all':
                return <AllModels />;
            default:
                return null;
        }
    };

    return (
        <React.Fragment>
            <div className={styles.toggleButtonGroup}>
                <div
                    className={`${styles.toggleButton} ${alignment === 'recent' ? styles.toggleButtonActive : ''}`}
                    onClick={(e) => handleChange(e, 'recent')}
                >
                    <p>RECENT</p>
                </div>
                <div
                    className={`${styles.toggleButton} ${alignment === 'starred' ? styles.toggleButtonActive : ''}`}
                    onClick={(e) => handleChange(e, 'starred')}
                >
                    <p>STARRED</p>
                </div>
                <div
                    className={`${styles.toggleButton} ${alignment === 'all' ? styles.toggleButtonActive : ''}`}
                    onClick={(e) => handleChange(e, 'all')}
                >
                    <p>ALL</p>
                </div>
            </div>
            <div className={styles.models}>
                {rendermodels()}
            </div>
        </React.Fragment>
    );
};

export default ModelList;