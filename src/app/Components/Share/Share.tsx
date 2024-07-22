"use client"

import React from 'react'
import { InlineShareButtons } from 'sharethis-reactjs';
import { useRoot } from '../../../context';


import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
    FacebookShareCount,
} from "react-share";

const Share = ({ endpoint, title, imageUrl, preFilledText }) => {
    const { liveUrl } = useRoot();

    if (!title?.includes("undefined") && !imageUrl?.includes("undefined") && !preFilledText?.includes("undefined")) {

        const shareUrl = `${liveUrl}/${endpoint} ${preFilledText}`;
        return (
            <div className="ok-share">
                <div>
                    <InlineShareButtons
                        config={{
                            alignment: "left", // alignment of buttons (left, right)
                            color: "social", // set the color of buttons (social, white)
                            enabled: true, // show/hide buttons (true, false)
                            font_size: 16, // font size for the buttons

                            labels: "counts", // button labels (cta, counts, null)
                            language: "en", // which language to use (see LANGUAGES)
                            networks: [
                                // which networks to include (see SHARING NETWORKS)
                                "facebook",
                                "messenger",
                                "twitter",
                                "whatsapp",
                                // "sharethis"
                            ],
                            padding: 12, // padding within buttons (INTEGER)
                            radius: 4, // the corner radius on each button (INTEGER)
                            show_total: true, // show/hide the total share count (true, false)
                            size: 45, // the size of each button (INTEGER)
                            // OPTIONAL PARAMETERS
                            url: shareUrl, // (defaults to current url)
                            title: title,
                            description: preFilledText,
                            image: imageUrl, // (defaults to og:image or twitter:image)
                        }}
                    />
                </div>

                {/* <FacebookShareCount url={shareUrl} />

                <FacebookShareCount url={shareUrl}>
                    {(shareCount) => <span className="myShareCountWrapper">{shareCount} shares</span>}
                </FacebookShareCount>



                <FacebookShareButton url={shareUrl} title={preFilledText}  hashtag="#hello">
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl} title={preFilledText}>
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
                <WhatsappShareButton url={shareUrl} title={preFilledText} separator=":: ">
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton> */}
            </div>
        )
    }
}

export default Share