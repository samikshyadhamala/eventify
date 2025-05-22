'use client'
import { motion } from 'framer-motion'

const LoadingRow = ({ index }: { index: number }) => (
    <motion.tr key={`loading-${index}`} className="border-b transition-colors">
        <td className="p-4 align-middle">
            <div className="h-5 w-40 bg-gray-200 rounded animate-pulse"></div>
        </td>
        <td className="p-4 align-middle w-full">
            <div className='w-full flex justify-center'>
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
        </td>
        <td className="p-4 align-middle">
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
        </td>
        <td className="p-4 align-middle text-center">
            <div className="inline-block">
                <div className="h-5 w-[100px] bg-gray-200 rounded animate-pulse"></div>
            </div>
        </td>
    </motion.tr>
)

export default LoadingRow;