'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Heart, 
  TrendingUp, 
  Award, 
  Users, 
  MessageCircle, 
  Quote, 
  ShieldCheck, 
  GraduationCap 
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      
     

     {/* Hero Section */}
{/* Hero Section */}
<section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-24 lg:pt-10 lg:pb-32" id="about">
  <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-6 md:space-y-8 text-center lg:text-left"
      >
        {/* Badge */}
        <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-xs sm:text-sm font-semibold tracking-wide">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
          </span>

          <span>Digital Marketing Expert & Leader</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
          Who is <br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Sourabh Jain?
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto lg:mx-0 max-w-xl text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed">
          "A young man who started with just 8 rupees, and built his unique identity through relentless hard work, networking, marketing skills, and deep-rooted social service."
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
          <a
            href="#journey"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-4 font-medium text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-slate-800 hover:shadow-xl"
          >
            Explore His Journey
          </a>

          <a
            href="https://wa.me/919756225637"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-green-600 bg-green-600 px-8 py-4 font-medium text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-green-700 hover:border-green-700 hover:shadow-xl"
          >
            Call / WhatsApp
          </a>
        </div>
      </motion.div>

      {/* Right Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        <div className="relative w-full aspect-[5/3] sm:min-h-[340px] md:min-h-[420px] rounded-3xl overflow-hidden bg-slate-100 shadow-2xl">
          <Image
            src="https://ik.imagekit.io/rsjsqdge7/Screenshot%202026-07-26%20010814.png?updatedAt=1785010975076"
            alt="Sourabh Jain Profile - Jain Digital Agency"
            fill
            priority
            referrerPolicy="no-referrer"
            className="object-contain"
          />
        </div>

        {/* Decorative Blurs */}
        <div className="absolute -top-6 -right-6 sm:-top-10 sm:-right-10 h-24 w-24 sm:h-40 sm:w-40 rounded-full bg-blue-200 opacity-70 blur-3xl animate-pulse"></div>

        <div className="absolute -bottom-6 -left-6 sm:-bottom-10 sm:-left-10 h-24 w-24 sm:h-40 sm:w-40 rounded-full bg-indigo-200 opacity-70 blur-3xl animate-pulse delay-700"></div>
      </motion.div>

    </div>
  </div>
</section>
      {/* Early Life & Foundations */}
      <section className="py-24 bg-white" id="journey">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold tracking-tight">Humble Beginnings</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Born in a simple middle-class family from a region often considered 15 years behind major metropolitan cities. His childhood was spent amidst limited resources and ordinary circumstances, but his dreams were never ordinary.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Leadership qualities shone early. His parents offered trust instead of extreme pressure, nurturing the self-confidence that became his greatest asset.
                </p>
              </div>
              
              <div className="pl-6 border-l-4 border-blue-500 space-y-4">
                <Quote className="text-blue-300 w-10 h-10" />
                <p className="text-2xl font-serif italic text-slate-800 leading-snug">
                  &quot;If your thinking is good, your intentions are clear, and you are not harming anyone, then people&apos;s opinions cannot stop you.&quot;
                </p>
              </div>
            </div>

            <div className="grid gap-8">
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 text-indigo-600">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Self-Confidence via Cricket</h3>
                <p className="text-slate-600 leading-relaxed">
                  At a young age, playing cricket earned him around ₹5,000–₹7,000. He bought his first ₹2,000+ shoes, realizing that money earned through one&apos;s own capability is the greatest asset.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">College & Networking</h3>
                <p className="text-slate-600 leading-relaxed">
                  Connecting with people became his biggest strength in college. He built a diverse network that became a topic of widespread discussion, learning from every interaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Service */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
            <Heart className="w-12 h-12 text-rose-500 mx-auto" />
            <h2 className="text-4xl font-bold tracking-tight">Social Service: The Real Identity</h2>
            <p className="text-lg text-slate-300">
              Sourabh always carried a deep sense of giving back to society. His actions speak louder than words, especially during times of crisis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              "Providing employment opportunities to youth.",
              "Supporting and organizing blood donation camps.",
              "Arranging fodder for cows and food for street dogs.",
              "Running fundraising campaigns for needy families.",
              "Helped 300+ people with ration and medicines during the Corona pandemic."
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 flex items-start space-x-4">
                <div className="w-2 h-2 mt-2.5 rounded-full bg-blue-400 shrink-0" />
                <p className="text-slate-200 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Expertise */}
      <section className="py-24 bg-slate-50" id="expertise">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-4xl font-bold tracking-tight">Career & Expertise</h2>
              <p className="text-lg text-slate-600">From a hands-on sales manager to one of Rajasthan&apos;s top-tier digital marketing influencers.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="group bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <TrendingUp className="w-32 h-32" />
              </div>
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8 text-indigo-600">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Sales & Revenue</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Never just a manager giving instructions. He led by example, directly communicating with customers and driving sales. He once contributed to increasing a company&apos;s revenue by ₹6 Crores.
              </p>
            </div>

            <div className="group bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Briefcase className="w-32 h-32" />
              </div>
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 text-blue-600">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Digital Marketing Pioneer</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Achieved a 60 Million monthly reach. Systematically utilized video testimonials in 2018 before it became an industry standard. Started podcasts when they were largely unknown in India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Jain Digital Agency Posters */}
      <section className="py-24 bg-slate-900 text-white" id="agency">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">Jain Digital Agency</h2>
            <p className="text-lg text-slate-300">
              Not just running ads, but taking responsibility for your business growth.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl bg-white">
              <Image 
                src="https://ik.imagekit.io/rsjsqdge7/Screenshot%202026-07-26%20010717.png?updatedAt=1785010975077" 
                alt="Jain Digital Agency - Performance Marketing Partner" 
                fill
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl bg-white">
              <Image 
                src="https://ik.imagekit.io/rsjsqdge7/Screenshot%202026-07-31%20215935.png" 
                alt="Jain Digital Agency - Complete Growth Strategy" 
                fill
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Patriotism & Principles */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 space-y-10">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold">Turning Down Crores</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                He turned down massive opportunities, including a ₹1.20 crore annual package in Dubai, for one simple reason:
              </p>
              <p className="text-xl font-medium text-slate-900 border-l-4 border-indigo-500 pl-4 py-2">
                &quot;I want to stay near my parents and do something big by staying in my country.&quot;
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bold">Thoughts on Politics & Administration</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                He believes in democracy and the power of questioning. He converses with ministers and collectors without hesitation based on facts.
              </p>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <ShieldCheck className="w-8 h-8 text-slate-400 mb-4" />
                <p className="text-slate-700 italic">
                  &quot;If you respect the law, the facts are with you, and your objective is public interest, then there is no need to be afraid of the police or administration.&quot;
                </p>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative h-[600px] rounded-3xl overflow-hidden shadow-xl bg-slate-900">
             <Image 
                src="https://ik.imagekit.io/rsjsqdge7/Screenshot%202026-07-31%20220012.png" 
                alt="National News Adda featuring Sourabh Jain" 
                fill
                className="object-contain"
                referrerPolicy="no-referrer"
              />
          </div>
        </div>
      </section>

      {/* Messages & Vision */}
      <section className="py-24 bg-slate-900 text-slate-200" id="vision">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-white mb-4">Vision & Messages</h2>
            <p className="text-xl text-slate-400">Guiding the next generation of youth and parents.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Youth */}
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
              <MessageCircle className="w-10 h-10 text-blue-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-6">For Gen Z Youth</h3>
              <ul className="space-y-4">
                <li className="flex gap-3"><span className="text-blue-400">•</span> Become truly successful, rather than just looking successful on social media.</li>
                <li className="flex gap-3"><span className="text-blue-400">•</span> Do not comment on anyone&apos;s personal life.</li>
                <li className="flex gap-3"><span className="text-blue-400">•</span> Always respect women.</li>
                <li className="flex gap-3"><span className="text-blue-400">•</span> Remember, every word said in the digital world has a lasting impact.</li>
              </ul>
            </div>

            {/* Parents */}
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 lg:translate-y-8">
              <Heart className="w-10 h-10 text-rose-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-6">For Parents</h3>
              <p className="leading-relaxed mb-6">
                After marriage and becoming a father, his perspective sharpened:
              </p>
              <div className="p-4 bg-slate-900/50 rounded-xl italic">
                &quot;Give children opportunities, not just marks. Don&apos;t compare them. Don&apos;t limit their thinking. Build their future with trust, not fear.&quot;
              </div>
            </div>

            {/* Career & Skills */}
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
              <GraduationCap className="w-10 h-10 text-emerald-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-6">On Skills & Jobs</h3>
              <p className="leading-relaxed mb-6">
                Why do so many remain unemployed despite 1000+ resumes? It&apos;s a lack of Communication, Practical Knowledge, Discipline, and Desire to Learn.
              </p>
              <div className="p-4 bg-slate-900/50 rounded-xl italic font-semibold text-emerald-300">
                &quot;A degree doesn&apos;t guarantee a job, skill does. Once a skill is developed, money starts coming automatically.&quot;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Conclusion */}
      <footer className="py-20 bg-white border-t border-slate-100 text-center">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-200">
            <span className="text-2xl font-bold text-white">SJ</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900">The Real Identity</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Sourabh Jain&apos;s story is not just of one person&apos;s success. It is a mindset—seeing big dreams despite limited resources, making hard work your identity, taking social service as a responsibility, and treating skills as your greatest asset.
          </p>
          <p className="text-slate-500 font-medium">
            Being born in an ordinary family does not determine your identity; your thinking, character, and work for society do.
          </p>
          <div className="pt-8 text-slate-400 text-sm">
            © {new Date().getFullYear()} Sourabh Jain Digital Marketing. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}