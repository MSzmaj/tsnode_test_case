import type { NextPage } from 'next'
import Head from 'next/head'
import { FormEvent } from 'react';
import styles from '../styles/Home.module.css'

const subscribeToEmailJob = async (jobId: string) => {
    const events = new EventSource(`http://tsnode_app:3000/api/email/sub/${jobId}`);
    events.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      const sentSpan = document.getElementById('emails_sent') as HTMLSpanElement;
      sentSpan.innerText = `Emails Sent: ${parsedData.data}`;
    };
}

function Form () {
  const startEmailJob = async (event: FormEvent) => {
    event.preventDefault();
    const emailInput = document.getElementById('number') as HTMLInputElement;
    const res = await fetch(`http://tsnode_app:3000/api/email/${emailInput.value}`, {mode: 'cors'});
    const result = await res.json();
    const jobSpan = document.getElementById('job_id') as HTMLSpanElement;
    const sentSpan = document.getElementById('emails_sent') as HTMLSpanElement;
    const jobId = result.jobId.jobId;
    jobSpan.innerText = `JobID: ${jobId}`;
    sentSpan.innerText = `Emails Sent: 0`;
    
    // await fetch(`http://localhost:3000/api/email/sub/${jobId}`);
    subscribeToEmailJob(jobId);
  }

  return (
    <form onSubmit={startEmailJob}>
      <input id="number" name="number" type="number" required></input>
      <button type="submit">Run Email Job</button>
    </form>
  )
}

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Emailer
        </h1>

        <p className={styles.description}>
          Click run to send X number of emails.
        </p>

        <div className={styles.grid}>
          <a className={styles.card}>{Form()}</a>

          <a className={styles.card}><span id="job_id">Job ID: _</span></a>
          <a className={styles.card}><span id="emails_sent">Sent: _</span></a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a>
          Michal Szmaj 2022
        </a>
      </footer>
    </div>
  )
}

export default Home
