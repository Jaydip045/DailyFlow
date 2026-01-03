import { Link } from 'react-router-dom';
import { Users, Clock, Calendar, DollarSign, CheckCircle, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 left-1/2 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg"
            >
              <Calendar className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Dayflow
            </span>
          </Link>
          <div className="flex gap-4">
            <Link
              to="/signin"
              className="px-6 py-2 text-indigo-600 hover:text-indigo-700 transition-all duration-300 hover:scale-105"
            >
              Sign In
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/signup"
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Sign Up</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative"
        onMouseMove={handleMouseMove}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-10 left-1/4 w-20 h-20"
        >
          <Sparkles className="w-full h-full text-indigo-300 animate-pulse" />
        </motion.div>
        
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute top-32 right-1/4 w-16 h-16"
        >
          <Sparkles className="w-full h-full text-purple-300 animate-pulse" />
        </motion.div>

        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl sm:text-7xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6"
        >
          Dayflow
        </motion.h1>
        
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-2xl sm:text-3xl text-indigo-600 mb-4"
        >
          Human Resource Management System
        </motion.p>
        
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          Every workday, perfectly aligned.
        </motion.p>
        
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/signup"
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-2 group relative overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/signin"
              className="px-8 py-4 bg-white text-indigo-600 rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
            >
              Sign In
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-12"
        >
          Everything you need to manage your workforce
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Users className="w-8 h-8" />}
            title="Employee Management"
            description="Manage employee profiles, personal details, job information, and documents in one centralized system."
            delay={0.1}
            gradient="from-blue-500 to-cyan-500"
          />
          <FeatureCard
            icon={<Clock className="w-8 h-8" />}
            title="Attendance Tracking"
            description="Track daily and weekly attendance with check-in/check-out functionality and comprehensive reporting."
            delay={0.2}
            gradient="from-green-500 to-emerald-500"
          />
          <FeatureCard
            icon={<Calendar className="w-8 h-8" />}
            title="Leave Management"
            description="Submit and approve leave requests with ease. Track paid leave, sick leave, and unpaid time off."
            delay={0.3}
            gradient="from-purple-500 to-pink-500"
          />
          <FeatureCard
            icon={<DollarSign className="w-8 h-8" />}
            title="Payroll Visibility"
            description="View salary structures and payroll details. Admins can manage and update compensation information."
            delay={0.4}
            gradient="from-amber-500 to-orange-500"
          />
          <FeatureCard
            icon={<CheckCircle className="w-8 h-8" />}
            title="Approval Workflows"
            description="Streamlined approval processes for leave requests and attendance modifications with real-time updates."
            delay={0.5}
            gradient="from-teal-500 to-cyan-500"
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8" />}
            title="Role-Based Access"
            description="Secure authentication with role-based permissions for employees and HR administrators."
            delay={0.6}
            gradient="from-indigo-500 to-purple-500"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl px-8 py-16 relative overflow-hidden shadow-2xl"
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }} />
          </div>

          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl text-white mb-6 relative z-10"
          >
            Ready to streamline your HR operations?
          </motion.h2>
          
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto relative z-10"
          >
            Join companies that trust Dayflow to manage their workforce efficiently.
          </motion.p>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 inline-block"
          >
            <Link
              to="/signup"
              className="px-8 py-4 bg-white text-indigo-600 rounded-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-2 group"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            &copy; 2026 Dayflow. All rights reserved.
          </motion.p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay, gradient }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  delay: number;
  gradient: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
    >
      {/* Gradient overlay on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.05 : 0 }}
        className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
      />

      <motion.div
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 0.6 }}
        className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center text-white mb-4 shadow-lg relative z-10`}
      >
        {icon}
      </motion.div>
      
      <h3 className="text-xl text-gray-900 mb-2 relative z-10">{title}</h3>
      <p className="text-gray-600 relative z-10">{description}</p>

      {/* Animated border on hover */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-br ${gradient} opacity-50`}
        style={{ padding: '2px' }}
      />
    </motion.div>
  );
}