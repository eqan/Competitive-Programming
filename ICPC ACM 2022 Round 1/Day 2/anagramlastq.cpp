#include <string>
#include <iostream>
using namespace std;
bool check_anagrams(string a1, string a2)
{
    bool words[26] = { false };
    for (unsigned int i = 0; i < a1.length(); i++)
    {
        if (a1[i] == ' ')
            continue; 
        words[int(a1[i]) - 97] = true;
    }
    for (unsigned int i = 0; i < a2.length(); i++)
    {
        if (a2[i] == ' ')
            continue;
        if (words[a2[i] - 97] == false)
            return false;
    }
    return true;
}

// Driver code
int main()
{
    int size; 
    cin >> size; 
    cin.ignore(); 
    string* arr = new string[size]; 
    for (int i = 0; i < size; i++)
    {    string a1, a2; 
    getline(cin, a1);
    getline(cin, a2); 

    if (check_anagrams(a1, a2))
        arr[i] = "Possible\n";
    else
        arr[i] = "Not Possible\n"; 
    }
    for (int i = 0; i < size; i++)
        cout << arr[i];
    return 0;
}