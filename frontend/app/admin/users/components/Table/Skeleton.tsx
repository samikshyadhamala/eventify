'use client'
import { motion } from 'framer-motion'

export default function Skeleton() {
    return (
        <>
            {
                Array(5).fill(0).map((_, i) => (
                    <motion.tr
                        key={i}
                        className="border-b transition-colors"
                    >
                        <td className="p-4 align-middle">
                            <div className="h-5 w-40 bg-gray-200 rounded animate-pulse"></div>
                        </td>
                        <td className="p-4 align-middle w-full flex justify-center">
                            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                        </td>
                        <td className="p-4 align-middle">
                            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                        </td>
                        <td className="p-4 align-middle h-full w-full flex justify-center">
                            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
                        </td>
                    </motion.tr>
                ))
            }
        </>
    )
}