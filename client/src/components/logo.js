import Image from 'next/image'
import Link from 'next/link';
const BlackLogo = () => {
    return (
        <div>
            <Link href="/">
                <div className="hover:cursor-pointer">
                    <img
                        src="/client/public/swift-logo-black.png"
                        width={200}
                        height={200}
                        alt="Logo"
                    ></img>
                </div>
            </Link>
        </div>
    )
}
const WhiteLogo = () => {
    return (
        <div>
            <Link href="/">
                <div className="hover:cursor-pointer relative bottom-10">
                    <Image
                        src="/client/public/swift-logo-white.png"
                        width={100}
                        height={100}
                        alt="Logo"
                    ></Image>
                </div>
            </Link>
        </div>
    )
}

export { BlackLogo, WhiteLogo };

