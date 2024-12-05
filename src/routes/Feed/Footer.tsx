import { CONFIG } from "site.config"
import React from "react"
import styled from "@emotion/styled"

const d = new Date();
const y = d.getFullYear();
const from = +CONFIG.since;

type Props = {
    className?: string;
};

const Footer: React.FC<Props> = ({ className }) => {
    return (
        <StyledWrapper className={className}>
            <a
                href="https://hits.seeyoufarm.com"
                target="_blank"
                rel="noreferrer"
            >
                <img
                    src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fshkisme.vercel.app&count_bg=%23DAB628&title_bg=%232D2B55&title=Borum%27s+Light&edge_flat=false"
                    alt="Hits Badge"
                />
            </a>
        </StyledWrapper>
    );
};

export default Footer;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    margin-top: 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: ${({ theme }) => theme.colors.gray10};
  }
`;