import 'package:flutter/material.dart';

void main() {
  runApp(const AcadFlowApp());
}

class AcadFlowApp extends StatelessWidget {
  const AcadFlowApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AcadFlow',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.indigo,
        useMaterial3: true,
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => const LoginScreen(),
        '/dashboard': (context) => const DashboardScreen(),
        '/attendance': (context) => const AttendanceScreen(),
        '/seminar': (context) => const SeminarReminderScreen(),
        '/reflection': (context) => const DailyReflectionScreen(),
        '/timetable': (context) => const ClassScheduleScreen(),
        '/export': (context) => const ExportProgressScreen(),
      },
    );
  }
}

class LoginScreen extends StatelessWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Login')),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.pushReplacementNamed(context, '/dashboard');
          },
          child: const Text('Login'),
        ),
      ),
    );
  }
}

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Dashboard')),
      body: ListView(
        children: [
          ListTile(
            title: const Text('Track Syllabus'),
            onTap: () {
              // Navigate to the respective screen
            },
          ),
          ListTile(
            title: const Text('Internal Marks'),
            onTap: () {
              // Navigate to the respective screen
            },
          ),
          ListTile(
            title: const Text('Assignments'),
            onTap: () {
              // Navigate to the respective screen
            },
          ),
          ListTile(
            title: const Text('Class Schedule'),
            onTap: () {
              Navigator.pushNamed(context, '/timetable');
            },
          ),
          ListTile(
            title: const Text('Daily Reflection'),
            onTap: () {
              Navigator.pushNamed(context, '/reflection');
            },
          ),
          ListTile(
            title: const Text('Attendance Status'),
            onTap: () {
              Navigator.pushNamed(context, '/attendance');
            },
          ),
          ListTile(
            title: const Text('Seminar Reminder'),
            onTap: () {
              Navigator.pushNamed(context, '/seminar');
            },
          ),
          ListTile(
            title: const Text('Export Progress to PDF'),
            onTap: () {
              Navigator.pushNamed(context, '/export');
            },
          ),
        ],
      ),
    );
  }
}

// Example of Attendance Screen
class AttendanceScreen extends StatelessWidget {
  const AttendanceScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Attendance Status')),
      body: Center(
        child: const Text('Attendance Screen'),
      ),
    );
  }
}

// Example of Seminar Reminder Screen
class SeminarReminderScreen extends StatelessWidget {
  const SeminarReminderScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Seminar Reminder')),
      body: Center(
        child: const Text('Seminar Reminder Screen'),
      ),
    );
  }
}

// Example of Daily Reflection Screen
class DailyReflectionScreen extends StatelessWidget {
  const DailyReflectionScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Daily Reflection')),
      body: Center(
        child: const Text('Daily Reflection Screen'),
      ),
    );
  }
}

// Example of Class Schedule Screen
class ClassScheduleScreen extends StatelessWidget {
  const ClassScheduleScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Class Schedule')),
      body: Center(
        child: const Text('Class Schedule Screen'),
      ),
    );
  }
}

// Example of Export Progress Screen
class ExportProgressScreen extends StatelessWidget {
  const ExportProgressScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Export Progress')),
      body: Center(
        child: const Text('Export Progress Screen'),
      ),
    );
  }
}