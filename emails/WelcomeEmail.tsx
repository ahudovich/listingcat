import * as React from 'react'
import { Body, Head, Html, Link, Text } from '@react-email/components'
import { EMAILS } from '@/data/emails'

export function WelcomeEmail() {
  return (
    <Html>
      <Head />
      <Body style={body}>
        <Text>Hi,</Text>
        <Text>
          I&apos;m Andrei – the founder of Listing Cat. I just wanted to say a big welcome, and
          thank you for signing up!
        </Text>

        <Text>
          As a solo founder, I&apos;m deeply involved in every part of the experience – so if you
          ever have a question, run into an issue, or have an idea that could make things better,
          please don&apos;t hesitate to reach me out. I genuinely want to hear from you!
        </Text>

        <Text>
          Thanks again for joining. I hope Listing Cat becomes a valuable part of your product
          growth journey!
        </Text>

        <Text>
          Warmly,
          <br />
          Andrei
          <br />
          Founder of Listing Cat
          <br />
          <Link href={`mailto:${EMAILS.FOUNDER}`}>{EMAILS.FOUNDER}</Link>
        </Text>
      </Body>
    </Html>
  )
}

const body = {
  margin: '0',
  padding: '0',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}
