#include <iostream>

using namespace std;

/**
 * @brief Determines the starting village to complete the tour.
 * * @param n The total number of villages.
 * @param landmark_info A 2D array where landmark_info[i][0] is the energy 
 * at village i+1 and landmark_info[i][1] is the distance 
 * to the next village.
 * @return The smallest label (1 to N) of the starting village.
 */
int getStartVillage(int n, int landmark_info[][2]) {
    if (n == 0) {
        return 0;
    }

    long long tank = 0;
    int start = 0;

    for (int i = 0; i < n; ++i) {
        int energy = landmark_info[i][0];
        int distance = landmark_info[i][1];

        tank += energy - distance;

        if (tank < 0) {
            start = i + 1;
            tank = 0;
        }
    }


    return start + 1;
}

// Main function to drive the program
int main() {
    int n;
    cin >> n;

    if (n <= 0) {
        return 0;
    }

    // Dynamically allocate a 2D array to hold the input data
    int (*landmark_info)[2] = new int[n][2];

    for (int i = 0; i < n; ++i) {
        // Read energy and distance for each village
        cin >> landmark_info[i][0] >> landmark_info[i][1];
    }

    // Call the function to get the result
    int start_village = getStartVillage(n, landmark_info);

    // Print the result
    cout << start_village << endl;

    // Free the dynamically allocated memory
    delete[] landmark_info;

    return 0;
}