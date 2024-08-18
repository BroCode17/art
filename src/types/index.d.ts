

export type Row2ImageParam = {
    text: string;
    imgUrl: string;
    color?: string;
    flag?: boolean;
    ref?: Element;
    className?: string;
    
}

export type  ExploreMoreBtnTypes = {
    name: string;
    href: string;
    className?: string;
}

export type IntroBoxTypes  = {
    title: string;
    description: string;
    className?: string;
}

export type BannerProps = {
    bannerImgUrl: string;
    bannerTitle: string;
    titleColor?: string;
}



export type ActiveType ={
    id: string;
    isActive?: boolean;
}


export type EditProductProps = {
    id?: string;
    name?: string;
    quantity?: number;
    image?: Blob | File | any;
    description?: string;
    price?: number;
}


export type ProductDetails = {
    name: string;
    description: string;
    price: string | number;
    quantyt: number;
}