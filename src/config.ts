/** Site-wide settings. */

/** The trailer sound controls are decorative for now; flip to show them again. */
export const SHOW_SOUND_CONTROLS = false;

/**
 * Review mode: outlines placeholder images in red and turns placeholder copy and
 * [bracketed notes] red, so anything still needing real content stands out.
 * Set to false once the content is final.
 */
export const FLAG_PLACEHOLDERS = true;

export const LINKEDIN_URL = 'https://www.linkedin.com/in/mileshillier/';
export const DRIBBBLE_URL = 'https://dribbble.com/mileshillier';
export const MEDIUM_URL = 'https://medium.com/@milesrhillier';
export const CONTACT_EMAIL = 'mileshillier+design@gmail.com';

/** "Get in Touch" goes to LinkedIn. */
export const GET_IN_TOUCH_URL = LINKEDIN_URL;

/** Drop the résumé PDF at `public/resume.pdf` and it is picked up automatically. */
export const RESUME_PDF_URL = `${import.meta.env.BASE_URL}resume.pdf`;
export const RESUME_DOWNLOAD_NAME = 'Miles-Hillier-Resume.pdf';
