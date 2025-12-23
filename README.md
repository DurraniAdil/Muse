# Muse - A Digital Atelier for the Modern Poet

Muse is an aesthetic web application designed for the contemplation and creation of digital poetry and quote cards. It serves as a "private library" or "scriptorium" where users can compose text, apply curated historical and artistic themes, and export high-quality images suitable for social media or digital archiving.

## Features

### 1. The Scriptorium (Creation Studio)
- **Rich Text Editor**: A customized editor leveraging `react-quill-new` capable of bold, italic, and variable font size formatting (Small to Huge).
- **Smart Formatting**: Automatically handles text scaling and overflow to ensure text fits beautifully within the card.
- **Folio Preview**: Real-time rendering of the final image as you type and style.

### 2. Curated Collections (Themes)
- A selection of artistic themes changing the typography, color palette, and background texture of the card.
- **Themes include**:
    - **Letter (Dark/Light)**: Classic correspondence aesthetic.
    - **Old Urdu**: Specialized support for Nastaliq font script.
    - **Greek/Latin**: Classical academia styles.
    - **Theological**: Serious, high-contrast aesthetics.
    - And more (Writeup, General English, etc.).

### 3. The Archive (History)
- **Private Ledger**: All created manuscripts are saved locally to the user's browser storage.
- **Gallery View**: View past creations in a responsive grid.
- **Management**: Re-download ` .png` files or delete individual entries.

### 4. Export Capabilities
- **High-Res Image Export**: Generates 3x/4x resolution PNGs for crisp text on any display.
- **Ledger Export**: Download the entire history of quotes as a JSON file for backup.
- **Incinerate Archive**: A "danger zone" feature to permanently wipe all local data.

## Technology Stack

- **Core Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Custom CSS
- **Fonts**: Google Fonts (Lora, Cormorant Garamond, Noto Nastaliq Urdu)
- **Icons**: Lucide React
- **Libraries**:
    - `react-quill-new`
    - `html-to-image`

## Run Locally

**Prerequisites:** Node.js

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    ```

3.  **Build for production**:
    ```bash
    npm run build
    ```

## Customization

To add new themes or modify existing ones, edit the `constants.ts` file. You can define new Collections with unique color palettes and font classes.
