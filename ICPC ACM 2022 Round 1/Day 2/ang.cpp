#include <string>
#include <iostream>
#include <cctype> 
#include <algorithm>
using namespace std;
bool check_anagrams(string a1, string a2)
{
    bool words[27] = { false };
    for (unsigned int i = 0; i < a1.length(); i++)
    {
        if (a1[i] == ' ')
            words[26] = true;
        words[int(a1[i]) - 97] = true;
    }
    for (unsigned int i = 0; i < a2.length(); i++)
    {
        if (a2[i] == ' ')
        {
            if (words[26] == false)
                return false;
        }
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
    {
        string a1, a2;
        getline(cin, a1);
        getline(cin, a2);
        transform(a1.begin(), a1.end(), a1.begin(), ::tolower);
        transform(a2.begin(), a2.end(), a2.begin(), ::tolower);
        if (check_anagrams(a1, a2))
            arr[i] = "Possible\n";
        else
            arr[i] = "Not Possible\n";
    }
    for (int i = 0; i < size; i++)
        cout << arr[i];
    return 0;
}