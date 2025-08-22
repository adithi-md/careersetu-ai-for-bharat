import 'package:flutter/material.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Dashboard')),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: const [
            Text("📚 Welcome to Your Study Tracker!", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            SizedBox(height: 24),
            Text("✅ Track Attendance"),
            Text("✅ Add Internal Marks"),
            Text("✅ Assignment/Seminar Reminders"),
            Text("✅ Auto Study Schedule"),
            SizedBox(height: 40),
            Text("🌟 Quote of the day:"),
            Text(
              "“The future belongs to those who believe in the beauty of their dreams.”",
              style: TextStyle(fontStyle: FontStyle.italic),
            )
          ],
        ),
      ),
    );
  }
}