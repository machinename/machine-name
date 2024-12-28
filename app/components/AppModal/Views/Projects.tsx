import React from "react";
import { OutlinedTextField, StyledButton } from "../../Styled";
import { Add, SearchOutlined } from "@mui/icons-material";
import { IconButton, InputAdornment } from '@mui/material';
import styles from '../AppModal.module.css';
import { Check, Circle, Star, StarOutlineOutlined } from '@mui/icons-material';
import { useAppContext } from "@/app/providers/AppProvider";

const RecentProjects = () => {
    return (
        <div className={styles.projects}>
            <div className={styles.project}>
                <div className={styles.projectLeading} >
                    <IconButton
                        size='small'
                        disabled
                    >
                        <Circle
                            fontSize='small'
                            sx={{ color: 'transparent' }} />
                    </IconButton>
                </div>
                <div className={styles.projectCenter}><p>Name</p></div>
                <div className={styles.projectTrailing}><p>ID</p></div>
            </div>
            <div className={styles.project}>
                <div className={styles.projectLeading}>
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
                <div className={styles.projectCenter}>
                    <p>Project Name</p>
                </div>
                <div className={styles.projectTrailing}>
                    <p>Project ID</p>
                </div>
            </div>
        </div>
    );
};

const StarredProjects = () => {
    return (
        <div className={styles.projects}>
            <div className={styles.project}>
                <div className={styles.projectLeading} >
                    <IconButton
                        size='small'
                        disabled
                    >
                        <Circle
                            fontSize='small'
                            sx={{ color: 'transparent' }} />
                    </IconButton>
                </div>
                <div className={styles.projectCenter}><p>Name</p></div>
                <div className={styles.projectTrailing}><p>ID</p></div>
            </div>
            <div className={styles.project}>
                <div className={styles.projectLeading}>
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
                <div className={styles.projectCenter}>
                    <p>Project Name</p>
                </div>
                <div className={styles.projectTrailing}>
                    <p>Project ID</p>
                </div>
            </div>
        </div>
    );
};

const AllProjects = () => {
    return (

        <div className={styles.projects}>
            <div className={styles.project}>
                <div className={styles.projectLeading} >
                    <IconButton
                        size='small'
                        disabled
                    >
                        <Circle
                            fontSize='small'
                            sx={{ color: 'transparent' }} />
                    </IconButton>
                </div>
                <div className={styles.projectCenter}><p>Name</p></div>
                <div className={styles.projectTrailing}><p>ID</p></div>
            </div>
            <div className={styles.project}>
                <div className={styles.projectLeading}>
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
                <div className={styles.projectCenter}>
                    <p>Project Name</p>
                </div>
                <div className={styles.projectTrailing}>
                    <p>Project ID</p>
                </div>
            </div>
            <div className={styles.project}>
                <div className={styles.projectLeading}>
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
                <div className={styles.projectCenter}>
                    <p>Project Name 2</p>
                </div>
                <div className={styles.projectTrailing}>
                    <p>Project ID 2</p>
                </div>
            </div>
        </div>
    );
};

const ProjectList = () => {
    const [alignment, setAlignment] = React.useState('recent');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
        console.log('New Alignment ', newAlignment);
    };

    const renderProjects = () => {
        switch (alignment) {
            case 'recent':
                return <RecentProjects />;
            case 'starred':
                return <StarredProjects />;
            case 'all':
                return <AllProjects />;
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
            <div className={styles.projects}>
                {renderProjects()}
            </div>
        </React.Fragment>
    );
};

interface NewProjectProps {
    onClose: () => void;
}

const Projects: React.FC<NewProjectProps> = ({
    onClose
}) => {

    const { setAppModalView } = useAppContext();
    
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleNewProject = () => {
        setAppModalView('newProject');
    };

    const handleSearchIcon = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <React.Fragment>
            <div className={styles.header}>
                <h2>Projects</h2>
                <StyledButton onClick={handleNewProject} startIcon={<Add />}>New Project</StyledButton>
            </div>
            <OutlinedTextField
                inputRef={inputRef}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start" sx={{ cursor: 'pointer' }} onClick={handleSearchIcon}>
                                <SearchOutlined />
                            </InputAdornment>
                        ),
                    },    
                }}
                autoComplete="off"
                size='small'
                id="searchProjects"
                // value={}
                // onChange={(e) => setConfirmPassword(e.target.value)}
                variant="outlined"
                label="Search projects"
            />
            <ProjectList />
            <div className={styles.footer}>
          
                    <StyledButton
                        variant="contained"
                        onClick={onClose}
                    >Cancel</StyledButton>
       
            </div>
        </React.Fragment>
    )
};

export default Projects;