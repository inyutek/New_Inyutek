'use client'

import { NotionRenderer } from 'react-notion-x'
import { ExtendedRecordMap } from 'notion-types'

// Core styles for react-notion-x are imported in the parent or here
// import 'react-notion-x/src/styles.css'

interface NotionPageProps {
    recordMap: ExtendedRecordMap
}

export function NotionPage({ recordMap }: NotionPageProps) {
    return (
        <NotionRenderer
            recordMap={recordMap}
            fullPage={false}
            darkMode={false}
            disableHeader
            className="!px-0 !w-full"
        />
    )
}
