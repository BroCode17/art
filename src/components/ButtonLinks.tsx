import { cn } from '@/lib/utils';
import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { ButtonLinksTypes } from '../../utils/data';

export interface  LinkProps {
    
    className?: string;
    href: string;
    type: ButtonLinksTypes
}
const renderIcons = (type: ButtonLinksTypes) => {
    switch(type){
        case ButtonLinksTypes.FACEBOOK:
            return <FaFacebook  size={24} />
        case ButtonLinksTypes.INSTAGRAM:
            return <FaInstagram size={24} />
        case ButtonLinksTypes.LINKEDIN:
            return <FaLinkedin size={24} />
        case ButtonLinksTypes.TWITTER:
            return <FaTwitter  size={24}/>
        default:
            break;
    }
}

const ButtonLinks = ({className, href, type}: LinkProps) => {
  return (
    <Link href={href} className={cn(``, className)}>
        {renderIcons(type)}
    </Link>
  )
}

export default ButtonLinks