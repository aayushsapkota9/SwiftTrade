import Image from 'next/image'
import Blacklogopng from "../../public/swift-logo-black.png"
import Whitelogopng from "../../public/swift-logo-white.png"
const BlackLogo = () => {
    return (
        <div>
            <Image
                src={Blacklogopng}
                // width={200}
                // height={200}
                alt="Picture of the author"
            />
        </div>
    )
}
const WhiteLogo = () => {
    return (
        <Image
            src={Whitelogopng}
            // width={500}
            // height={500}
            alt="Picture of the author"
        />
    )
}

export { BlackLogo, WhiteLogo };

